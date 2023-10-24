import { Menu } from "humf-proto/build/proto/kitchen";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class OrderMenu {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false})
    ticketId: number;
    @Column({ nullable: false })
    menuId: number;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    price: number;
    @Column()
    description: string;
    @Column({ nullable: false })
    quatity: number;
}

 