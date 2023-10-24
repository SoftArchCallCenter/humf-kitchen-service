import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KitchenService } from './kitchen.service';
// import { CreateKitchenDto } from './dto/create-kitchen.dto';
// import { UpdateTicketDto } from './dto/update-kitchen.dto';
import {
  KitchenId,
  KitchenServiceController,
  CreateTicketDto,
  TicketId,
  TicketList,
  UpdateTicketDto,
  Order,
  KitchenServiceControllerMethods
} from '../../humf-proto/build/proto/kitchen'

@Controller()
@KitchenServiceControllerMethods()
export class KitchenController implements KitchenServiceController{
  constructor(private readonly kitchenService: KitchenService) {}

  getOrder(kitchenId: KitchenId){
    return this.kitchenService.getOrder(kitchenId)
  }

  createTicket(createTicketDto: CreateTicketDto){
    return this.kitchenService.createTicket(createTicketDto)
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
