import {
  Body,
  Controller,
  Get,
  ParseFloatPipe,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { responseExchange } from './interfaces/response.interface';

import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateExchangeDto } from './dto/createExchange.dto';
import { Exchange } from './entity/exchange.entity';

@Controller('api/v1/exchange')
export class ExchangeRateController {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    private readonly authService: AuthService,
  ) {}

  @Post('/authorization')
  async Authorization(@Body() requestData: Record<string, any>) {
    const result = await this.authService.validateUserCredentials(
      requestData.client_id,
      requestData.client_secret,
      requestData.grant_type,
    );

    if (!result) {
      throw new UnauthorizedException();
    } else {
      return this.authService.loginWithCredentials(requestData);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
 async getExchangeRate(
    @Query('amount', ParseFloatPipe) amount?: number,
    @Query('currencyOrigin') currencyOrigin?: string,
    @Query('currencyTarget') currencyTarget?: string,
  ): Promise<responseExchange> {
    return await this.exchangeRateService.getExchange(
      amount,
      currencyOrigin,
      currencyTarget,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createExchangeDto: CreateExchangeDto): Promise<Exchange> {
    return this.exchangeRateService.insertExchange(createExchangeDto);
  }

}
