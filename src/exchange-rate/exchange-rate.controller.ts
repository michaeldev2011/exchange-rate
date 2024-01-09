import {
  Body,
  Controller,
  Get,
  ParseFloatPipe,
  Patch,
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
import { UpdateExchangeDto } from './dto/updateExchange.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

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
  @ApiBearerAuth()
  @Get('/calculate')
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
  @ApiBearerAuth()

  @Post('')
  create(@Body() createExchangeDto: CreateExchangeDto): Promise<any> {
    try {
      return this.exchangeRateService.insertExchange(createExchangeDto);
    } catch (error) {
      return error
    }
    
  }


  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('')
  update(@Body() updateExchangeDto: UpdateExchangeDto): Promise<any> {
    try {
      return this.exchangeRateService.updateExchangeRate(updateExchangeDto);
    } catch (error) {
      return error
    }
    
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('')
  getAll(): Promise<any> {
    try {
      return this.exchangeRateService.getAllExchangeRate();
    } catch (error) {
      return error
    }
    
  }

}
