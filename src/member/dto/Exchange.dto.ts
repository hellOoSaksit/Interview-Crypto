import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class ExchangeDto {
    @IsNotEmpty()
    @IsString()
    from_currency :string;

    @IsNotEmpty()
    @IsString()
    to_currency:string;

    @IsNotEmpty()
    @IsNumber()
    amount : number;
}
