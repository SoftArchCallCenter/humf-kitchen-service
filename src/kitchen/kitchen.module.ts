import { Module } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { KitchenController } from './kitchen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCard } from './entities/ticket.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    TicketCard
  ])],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}
