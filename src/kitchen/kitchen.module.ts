import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
