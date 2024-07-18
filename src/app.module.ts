import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../config/db';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { CreatorsModule } from './creators/creators.module';
import { FarmsModule } from './farms/farms.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    LoginModule,
    UsersModule,
    RolesModule,
    CreatorsModule,
    FarmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
