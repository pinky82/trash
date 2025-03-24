import { Module } from '@nestjs/common';
import { WechatController } from './wechat.controller';
import { WechatService } from './wechat.service';
import { RedisModule } from '../redis/redis.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationModule } from '../application/application.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    ApplicationModule,
    AuthModule
  ],
  controllers: [WechatController],
  providers: [WechatService],
  exports: [WechatService],
})
export class WechatModule {} 