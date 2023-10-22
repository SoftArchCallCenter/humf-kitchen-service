require('dotenv').config()
import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { 
  KitchenId, 
  Order, 
  TicketId, 
  TicketList,
  UpdateTicketDto,
  Ticket
} from 'humf-proto/build/proto/kitchen';
import { map , lastValueFrom } from 'rxjs';
// import { CreateKitchenDto } from './dto/create-kitchen.dto';
// import { UpdateKitchenDto } from './dto/update-kitchen.dto';

@Injectable()
export class KitchenService {
  constructor(private httpService: HttpService) {}

  async getOrder(kitchenId: KitchenId){
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

  async completeTicket(ticketId: TicketId){
    // find ticket with ticketId
    const {id, ...ticket} = {
      id : 1,
      userId : 1,
      resId : 1,
      menus : [{
        id: 1,
        name: "pad thai",
        price: 30,
        description: "",
        quatity : 2,
      }]
    }
    // remove ticket in database

    // POST /order @body ticket
    const data = await lastValueFrom(
      this.httpService.post("http://localhost:4000/order", ticket).pipe(
        map(res => res.data)
      )
    );
    
    return {}
  }
}
