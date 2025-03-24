import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from './entities/application.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity]),
    AuthModule
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService]
})
export class ApplicationModule {} 