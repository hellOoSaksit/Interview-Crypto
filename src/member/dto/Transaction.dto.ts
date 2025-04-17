import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransactiodDto {
    @IsNotEmpty()
    @IsString()
    to_wallet_id :string;

    @IsNotEmpty()
    @IsString()
    currency_code :string;

    @IsNotEmpty()
    @IsNumber()
    amount : number;
}
