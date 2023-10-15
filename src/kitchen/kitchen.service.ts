import { Injectable } from '@nestjs/common';
import { 
  KitchenId, 
  Order, 
  TicketId, 
  TicketList,
  UpdateTicketDto,
  Ticket
} from 'humf-proto/build/proto/kitchen';
// import { CreateKitchenDto } from './dto/create-kitchen.dto';
// import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@Injectable()
export class KitchenService {

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
