import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCard } from './entities/ticket.entity'
import { OrderMenu } from './entities/order.entity';
import { RmqModule } from '../rmq/rmq.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([
    TicketCard,OrderMenu
  ]),
  HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
  RmqModule.register({
    name: 'NOTIFICATION'
  }),
],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
