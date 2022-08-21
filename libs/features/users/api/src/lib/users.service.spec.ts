import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model, Query } from "mongoose";
import { UserDocument, UserModel, UserSchema } from "./user.model";
import { UsersService } from "./users.service";
import { createMock } from "@golevelup/ts-jest";

const mockUser = (
  email = "test@email.com",
  createdAt = 1660162024484,
  updatedAt = 1660162024484,
  firstName = "John",
  lastName = "Doe",
  password = "123qweASD",
  _id = "some id"
): UserModel => {
  return {
    _id,
    createdAt,
    email,
    firstName,
    lastName,
    password,
    updatedAt,
  };
};

const mockUserDoc = (mock?: Partial<UserModel>): Partial<UserDocument> => ({
  email: mock.email ?? "hello@world.com",
  firstName: mock.firstName ?? "Hello",
  lastName: mock.lastName ?? "World",
  _id: "some id",
});

describe("users service", () => {
  let userService: UsersService;
  let model: Model<UserModel>;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    model = mongoConnection.model(UserModel.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(UserModel.name),
          useValue: model,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();

    await mongod.stop();
  });

  afterEach(async () => {
    jest.clearAllMocks();

    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it("should be defined", () => {
    expect(userService).toBeDefined();
  });

  it("should insert a new user", async () => {
    jest.spyOn(model, "create").mockImplementationOnce(() =>
      Promise.resolve({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mail.com",
      })
    );

    const newUser = await userService.create({
      email: "john.doe@mail.com",
      firstName: "John",
      lastName: "Doe",
      password: "123qweASD",
    });

    const { email, firstName, lastName } = mockUser(
      "john.doe@mail.com",
      1660162024484,
      1660162024484,
      "John",
      "Doe",
      "123qweASD",
      "some id"
    );

    expect(newUser.email).toEqual(email);
    expect(newUser.firstName).toEqual(firstName);
    expect(newUser.lastName).toEqual(lastName);
  });

  it("should return an array of all users", async () => {
    const usersArray = [mockUser("test2@mail.com")];

    jest.spyOn(model, "find").mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const users = await userService.findAll();

    expect(users).toEqual(usersArray);
  });

  /**
   * NOT WORKING YET
   */
  it.skip("should return a user found by email", async () => {
    jest.spyOn(model, "findOne").mockReturnValueOnce(
      createMock<Query<UserDocument, UserDocument>>({
        exec: jest.fn().mockResolvedValueOnce(
          mockUserDoc({
            email: "find@me.com",
            firstName: "John",
            lastName: "Doe",
          })
        ),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    );

    const mockedUser = mockUser(
      "find@me.com",
      1660162024484,
      1660162024484,
      "John",
      "Doe"
    );

    const user = await userService.findOneByEmail("find@me.com");

    expect(user.email).toEqual(mockedUser.email);
  });
});
