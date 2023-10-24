import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCard } from './entities/ticket.entity'
import { OrderMenu } from './entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    TicketCard,OrderMenu
  ])],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
