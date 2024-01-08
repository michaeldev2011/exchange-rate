import { IsNotEmpty, IsString, IsInt, IsPositive, IsCurrency, IsNumber } from 'class-validator';

export class CreateExchangeDto {
  @IsNotEmpty({ message: 'Field currencyOrigin must be added' })
  @IsString()
  currencyOrigin: string;

  @IsNotEmpty({ message: 'Field currencyTarget must be added' })
  @IsString()
  currencyTarget: string;

  @IsNotEmpty({ message: 'exchangeRate must be added' })
  @IsNumber()
  @IsPositive()
  exchangeRate: number;
}