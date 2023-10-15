import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KitchenService } from './kitchen.service';
// import { CreateKitchenDto } from './dto/create-kitchen.dto';
// import { UpdateKitchenDto } from './dto/update-kitchen.dto';
import {
  KitchenId,
  KitchenServiceController,
  TicketId,
  TicketList,
  UpdateTicketDto,
  Order
} from '../../humf-proto/build/proto/kitchen'

@Controller()
export class KitchenController implements KitchenServiceController{
  constructor(private readonly kitchenService: KitchenService) {}

  getOrder(kitchenId: KitchenId){
    return this.kitchenService.getOrder(kitchenId)
  }

  createTicket(kitchenId: KitchenId){
    return this.kitchenService.createTicket(kitchenId)
  }

  getTickets(kitchenId: KitchenId){
    return this.kitchenService.getTickets(kitchenId)
  }

  updateTicket(updateTicketDto: UpdateTicketDto){
    return this.kitchenService.updateTicket(updateTicketDto)
  }

  completeTicket(ticketId: TicketId){
    return this.kitchenService.completeTicket(ticketId)
  }
}
