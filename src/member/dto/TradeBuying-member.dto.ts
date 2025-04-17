import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class TradeBuyingDto {
    @IsNotEmpty()
    @IsString()
    seller_wallet_id:string;

    @IsNotEmpty()
    @IsString()
    currency:string;

    @IsNotEmpty()
    @IsNumber()
    amount:number;
}
