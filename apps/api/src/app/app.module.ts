import { DatabaseModule } from "@chef-assistant/core-database";
import { UsersModule } from "@chef-assistant/features-users-api";
import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
