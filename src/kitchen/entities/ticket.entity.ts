import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class TicketCard {
    @PrimaryGeneratedColumn()
    id: number;
}

 