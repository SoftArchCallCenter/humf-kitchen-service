require('dotenv').config()
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { 
  KitchenId,
  TicketId, 
  CreateTicketDto,
  UpdateTicketDto,
  Ticket,
  UserId,
} from 'humf-proto/build/proto/kitchen';
import { map , lastValueFrom } from 'rxjs';
import { TicketCard } from './entities/ticket.entity';
import { Repository } from 'typeorm'
import { OrderMenu } from './entities/order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create_notification.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class KitchenService {
  
  constructor(
    private httpService: HttpService,
    @InjectRepository(TicketCard) private TicketRepository: Repository<TicketCard>,
    @InjectRepository(OrderMenu) private OrderRepository: Repository<OrderMenu>,
    @Inject('NOTIFICATION') private rmqClient: ClientProxy,
  ) {}
  
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

    const noticData : CreateNotificationDto = {
      user_id: String(userId),
      kitchen_id: String(resId),
      ticket_id: String(ticketId),
      order_id: String(ticketId),
      status: status,
      datetime: new Date()
    } 


    this.rmqClient.emit('create_notification', noticData)

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

  async getTicketsByUserId(userId: UserId){
    const result:Ticket[] = []
    const tickets = await this.TicketRepository.findBy({userId: userId.id});
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

    const noticData : CreateNotificationDto = {
      user_id: String(newTicket.userId),
      kitchen_id: String(newTicket.resId),
      ticket_id: String(id),
      order_id: String(id),
      status: status,
      datetime: new Date()
    } 


    this.rmqClient.emit('create_notification', noticData)

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
      this.httpService.post(`${process.env.ORDER_SERVICE_URL}/order`, {userId, resId, menus}).pipe(
        map(res => res.data)
      )
    );

    const noticData : CreateNotificationDto = {
      user_id: String(userId),
      kitchen_id: String(resId),
      ticket_id: String(ticketId),
      order_id: String(ticketId),
      status: "COMPLETED",
      datetime: new Date()
    } 


    this.rmqClient.emit('create_notification', noticData)
    
    return {}
  }
}
