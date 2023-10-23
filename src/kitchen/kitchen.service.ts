import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  KitchenId, 
  Order, 
  TicketId, 
  TicketList,
  UpdateTicketDto,
  Ticket
} from 'humf-proto/build/proto/kitchen';
import { TicketCard } from './entities/ticket.entity';
import { Repository } from 'typeorm'
// import { CreateKitchenDto } from './dto/create-kitchen.dto';
// import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@Injectable()
export class KitchenService {
  constructor(
    @InjectRepository(TicketCard) private TicketRepository: Repository<TicketCard>,
  ) {}

  getOrder(kitchenId: KitchenId){
    const order:Order = {

    }
    return order
  }

  createTicket(kitchenId: KitchenId){
    const ticketList:TicketList = {
      tickets: []
    }
    return ticketList
  }

  getTickets(kitchenId: KitchenId){
    const ticketList:TicketList = {
      tickets: []
    }
    return ticketList
  }

  updateTicket(updateTicketDto: UpdateTicketDto){
    const ticket:Ticket = {

    }
    return ticket
  }

  completeTicket(ticketId: TicketId){
    return {}
  }
}
