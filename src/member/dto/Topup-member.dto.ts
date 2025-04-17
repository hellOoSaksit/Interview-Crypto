import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum currencyEnum {
    THB = "THB",
    USD = "USD"
}

export class TopUpDto {
    @IsNotEmpty()
    @IsString()
    currency_code : string;
    @IsNotEmpty()
    @IsNumber()
    amount : number;
}
