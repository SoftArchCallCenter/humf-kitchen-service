import { Menu } from "humf-proto/build/proto/kitchen";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class TicketCard {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    userId: number;
    @Column({ nullable: false })
    resId: number;
    @Column({ nullable: false })
    status: string;
}

 