import { CacheInterceptor } from '@nestjs/cache-manager';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { 
  KitchenId, 
  Order, 
  TicketId, 
  TicketList,
  UpdateTicketDto,
  Ticket
} from 'humf-proto/build/proto/kitchen';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class KitchenService {
  
  constructor(
    private readonly redisService: RedisService
  ) {}

  @UseInterceptors(CacheInterceptor)
  async getOrder(kitchenId: KitchenId){
    console.log("start consume queue")
    const result = await this.redisService.consumeQueue(`kitchen_${kitchenId.id}`) as Order | null;
    if (result){
      return result
    }
    return {userId: undefined,resId: undefined, menus: null}
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
      id: '',
      order: undefined
    }
    return ticket
  }

  completeTicket(ticketId: TicketId){
    return {}
  }
}
