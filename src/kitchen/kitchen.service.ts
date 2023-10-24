require('dotenv').config()
import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  KitchenId, 
  Order, 
  TicketId, 
  CreateTicketDto,
  TicketList,
  UpdateTicketDto,
  Ticket
} from 'humf-proto/build/proto/kitchen';
import { map , lastValueFrom } from 'rxjs';
import { TicketCard } from './entities/ticket.entity';
import { Repository } from 'typeorm'
import { OrderMenu } from './entities/order.entity';

@Injectable()
export class KitchenService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(TicketCard) private TicketRepository: Repository<TicketCard>,
    @InjectRepository(OrderMenu) private OrderRepository: Repository<OrderMenu>,
  ) {}
   
  getOrder(kitchenId: KitchenId){
    const order:Order = {
      userId: 0,
      resId: 0,
      menus: []
    }
    return order
  }

  async createTicket(createTicketDto: CreateTicketDto){
    const {userId, resId, menus} = createTicketDto;
    let newTicket = this.TicketRepository.create({userId, resId, status: "accepted"});
    const createdTicket = await this.TicketRepository.save(newTicket);
    const ticketId = createdTicket.id
    const status = createdTicket.status;
    for (var menu of menus){
      const {id, ...menuField} = menu;
      let newMenu = this.OrderRepository.create({ticketId,menuId: id, ...menuField});
      await this.OrderRepository.save(newMenu);
    }
    return {id: ticketId, status, order: createTicketDto}
  }

  async getTickets(kitchenId: KitchenId){
    const result:Ticket[] = []
    const tickets = await this.TicketRepository.findBy({resId: kitchenId.id});
    for (var ticket of tickets){
      const {id, userId, resId, status} = ticket;
      const menus = await this.OrderRepository.findBy({ticketId: id});
      result.push({id, status, order:{userId, resId, menus}})
    }
    return {tickets: result}
  }

  async updateTicket(updateTicketDto: UpdateTicketDto){
    const {id, status} = updateTicketDto
    const ticket = await this.TicketRepository.update({ id },{ status })
    if(!ticket){
      throw new NotFoundException('Ticket not found');
    }
    const newTicket = await this.TicketRepository.findOneBy({ id })
    return {id, status: newTicket.status, order: null}
  }

  async completeTicket(ticketId: TicketId){
    // find ticket with ticketId
    const tickets = await this.TicketRepository.findOneBy({id:ticketId.id})
    const Menus = await this.OrderRepository.findBy({ticketId: ticketId.id});
    
    // remove ticket in database
    await this.TicketRepository.delete({id:ticketId.id})
    await this.OrderRepository.delete({ticketId: ticketId.id})

    // POST /order @body ticket
    const {userId, resId} = tickets
    const menus = Menus.map((menu) => {
      const {id, ticketId, menuId, ...rest} = menu;
      return rest
    })
    await lastValueFrom(
      this.httpService.post("http://localhost:4000/order", {userId, resId, menus}).pipe(
        map(res => res.data)
      )
    );
    
    return {}
  }
}
