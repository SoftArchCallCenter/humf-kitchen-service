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
import { TicketCard } from './entities/ticket.entity';
import { Repository } from 'typeorm'
import { OrderMenu } from './entities/order.entity';

@Injectable()
export class KitchenService {
  constructor(
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

  completeTicket(ticketId: TicketId){
    return {}
  }
}
