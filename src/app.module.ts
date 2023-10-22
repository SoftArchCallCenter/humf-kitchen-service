import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KitchenModule } from './kitchen/kitchen.module';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [KitchenModule, RedisModule],
  controllers: [AppController],
  providers: [AppService, ], 
})
export class AppModule {}
