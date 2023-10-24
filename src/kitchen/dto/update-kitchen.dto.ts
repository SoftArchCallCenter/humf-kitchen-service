// import { PartialType } from '@nestjs/mapped-types';
// import { CreateKitchenDto } from './create-kitchen.dto';

// export class UpdateKitchenDto extends PartialType(CreateKitchenDto) {
//   id: number;
// }
import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-kitchen.dto';
import { IsEmail, IsNumber } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
id:number;
}
