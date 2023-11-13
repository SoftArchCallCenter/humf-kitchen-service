import { Controller } from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import {
  KitchenId,
  KitchenServiceController,
  CreateTicketDto,
  TicketId,
  UserId,
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

  getTickets(kitchenId: KitchenId){
    return this.kitchenService.getTickets(kitchenId)
  }

  getTicketsByUserId(userId: UserId){
    return this.kitchenService.getTicketsByUserId(userId)
  }

  updateTicket(updateTicketDto: UpdateTicketDto){
    return this.kitchenService.updateTicket(updateTicketDto)
  }

  completeTicket(ticketId: TicketId){
    return this.kitchenService.completeTicket(ticketId)
  }
}
