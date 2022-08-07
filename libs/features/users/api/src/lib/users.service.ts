import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserInput } from "./dto/create-user.dto";
import { UserDocument, UserModel } from "./user.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserInput): Promise<UserModel> {
    const createdUser = new this.userModel(createUserDto);

    return createdUser.save();
  }

  async findAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    return this.userModel.findOne({ email });
  }

  async deleteUserById(userId: string) {
    return this.userModel.findByIdAndRemove(userId);
  }
}
