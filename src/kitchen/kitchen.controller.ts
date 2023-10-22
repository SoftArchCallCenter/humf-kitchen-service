import { Controller, UseInterceptors } from '@nestjs/common';
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
  Order,
  KitchenServiceControllerMethods
} from '../../humf-proto/build/proto/kitchen'
import { RedisService } from 'src/redis/redis.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
@KitchenServiceControllerMethods()
export class KitchenController implements KitchenServiceController{
  constructor(
    private readonly kitchenService: KitchenService,
    private readonly redisService: RedisService
    ) {}

  getOrder(kitchenId: KitchenId){
    return this.kitchenService.getOrder(kitchenId)
  }

  createTicket(kitchenId: KitchenId){
    return this.kitchenService.createTicket(kitchenId)
  }

  @UseInterceptors(CacheInterceptor)
  async getTickets(kitchenId: KitchenId){
    const foo = await this.redisService.get('foo');
    // console.log(foo)
    if (foo){
      console.log("CACHED");
      // return foo;
      return this.kitchenService.getTickets(kitchenId)
    }
    console.log('NOT CACHED!');
    const f = {foo:'bar'}
    this.redisService.set('foo', f)
    return this.kitchenService.getTickets(kitchenId)
  }

  updateTicket(updateTicketDto: UpdateTicketDto){
    return this.kitchenService.updateTicket(updateTicketDto)
  }

  completeTicket(ticketId: TicketId){
    return this.kitchenService.completeTicket(ticketId)
  }
}
