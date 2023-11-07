import { Controller } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import {
  KitchenId,
  KitchenServiceController,
  CreateTicketDto,
  TicketId,
  UpdateTicketDto,
  KitchenServiceControllerMethods,
} from '../../humf-proto/build/proto/kitchen'

@Controller()
@KitchenServiceControllerMethods()
export class KitchenController implements KitchenServiceController{
  constructor(
    private readonly kitchenService: KitchenService,
    ) {}

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
