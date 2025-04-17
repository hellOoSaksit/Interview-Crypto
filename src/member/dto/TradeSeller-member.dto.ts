import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum OrderType {
    SELL = "SELL"
}

export class TradeSellerDto {
    @IsNotEmpty()
    @IsEnum(OrderType)
    order_type : OrderType;

    @IsNotEmpty()
    @IsString()
    from_currency :string;

    @IsNotEmpty()
    @IsNumber()
    amount : number;

    @IsNotEmpty()
    @IsNumber()
    price : number;
}
