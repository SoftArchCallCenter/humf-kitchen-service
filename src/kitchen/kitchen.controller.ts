import { Controller } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import {
  KitchenId,
  KitchenServiceController,
  TicketId,
  TicketList,
  UpdateTicketDto,
  Order,
  KitchenServiceControllerMethods,
  CreateTicketDto
} from '../../humf-proto/build/proto/kitchen'

@Controller()
@KitchenServiceControllerMethods()
export class KitchenController implements KitchenServiceController{
  constructor(
    private readonly kitchenService: KitchenService,
    ) {}

  async getOrder(kitchenId: KitchenId){
    return this.kitchenService.getOrder(kitchenId)
  }

  createTicket(createTicketDto: CreateTicketDto){
    return this.kitchenService.createTicket(createTicketDto)
  }

  async getTickets(kitchenId: KitchenId){
    return this.kitchenService.getTickets(kitchenId)
  }

  updateTicket(updateTicketDto: UpdateTicketDto){
    return this.kitchenService.updateTicket(updateTicketDto)
  }

  completeTicket(ticketId: TicketId){
    return this.kitchenService.completeTicket(ticketId)
  }
}
