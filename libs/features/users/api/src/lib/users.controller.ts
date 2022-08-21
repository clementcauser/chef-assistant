import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { UserModel } from "./user.model";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserByEmail(@Query("email") email: string): Promise<UserModel> {
    if (!email) {
      throw new BadRequestException("Missing query parameter");
    }

    return this.usersService.findOneByEmail(email);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.usersService.deleteUserById(id);
  }
}
