import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPositive, IsNumber, Matches } from 'class-validator';

export class UpdateExchangeDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Field currencyOrigin must be added.' })
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message:
      'currencyOrigin only accept letters.',
  } )
  currencyOrigin: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Field currencyTarget must be added.' })
  @IsString()
  @Matches(/^[A-Za-z]+$/, {
    message:
      'currencyTarget only accept letters.',
  } )
  currencyTarget: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'exchangeRate must be added' })
  @IsNumber()
  @IsPositive()
  exchangeRate: number;

}