import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from "mongoose";
import { UserModel, UserSchema } from "./user.model";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<UserModel>;

  const result: UserModel = {
    _id: "ijfdsofisdjfos",
    email: "test@mail.com",
    password: "123qweasd",
    firstName: "Brad",
    lastName: "Pitt",
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(UserModel.name, UserSchema);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getModelToken(UserModel.name), useValue: userModel },
      ],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    service = moduleRef.get<UsersService>(UsersService);
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
    expect(controller).toBeDefined();
  });

  describe("get user by email", () => {
    it("should find a user with email", async () => {
      jest
        .spyOn(service, "findOneByEmail")
        .mockImplementation(async () => result);

      expect(await controller.getUserByEmail("test@mail.com")).toBe(result);
    });
  });
});
