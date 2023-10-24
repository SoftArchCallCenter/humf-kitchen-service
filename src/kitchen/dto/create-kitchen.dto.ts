// export class CreateKitchenDto {}
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    order: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
