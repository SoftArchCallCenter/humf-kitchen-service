import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KitchenModule } from './kitchen/kitchen.module';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    KitchenModule, 
    DatabaseModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_QUEUE: Joi.string().required(),
      }),
      envFilePath: './.env',
    }), 
  ],
  controllers: [AppController],
  providers: [AppService, ], 
})
export class AppModule {}
