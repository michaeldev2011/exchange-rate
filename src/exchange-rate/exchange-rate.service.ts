import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { responseExchange } from './interfaces/response.interface';
import { Repository } from 'typeorm';
import { CreateExchangeDto } from '../exchange-rate/dto/createExchange.dto';
import { exchangeDB } from '../exchange-rate/data/exchange';
import { UpdateExchangeDto } from './dto/updateExchange.dto';

@Injectable()
export class ExchangeRateService implements OnModuleInit {
  onModuleInit() {
    // const seedData = [
    //   {
    //     currencyOrigin: 'PEN',
    //     currencyTarget: 'USD',
    //     exchangeRate: 0.27,
    //   },
    //   {
    //     currencyOrigin: 'USD',
    //     currencyTarget: 'PEN',
    //     exchangeRate: 3.70,
    //   },
    //   {
    //     currencyOrigin: 'CLP',
    //     currencyTarget: 'USD',
    //     exchangeRate: 0.0011,
    //   },
    //   {
    //     currencyOrigin: 'USD',
    //     currencyTarget: 'CLP',
    //     exchangeRate: 907.24,
    //   },
    // ];
    // seedData.map((exchange) =>
    //    this.insertExchange(exchange)
    // );
  }

  constructor() // @Inject('EXCHANGE_REPOSITORY')
  // private exchangeRepository: Repository<Exchange>,
  {}

  async getExchange(
    amount: number,
    currencyOrigin: string,
    currencyDestination: string,
  ): Promise<responseExchange> {
    // get exchange-type by currency origin

    const exchangeRate = await this.getExchangeRate(
      currencyOrigin,
      currencyDestination,
    );

    if (!exchangeRate) {
      return;
    }

    // calculate

    const exchangeAmount = amount * exchangeRate;

    const response: responseExchange = {
      initialAmount: amount,
      amountWithExchange: exchangeAmount,
      currencyOrigin: currencyOrigin,
      currencyDestinity: currencyDestination,
      exchangeRate: exchangeRate as number,
    };

    return response;
  }

  async insertExchange(createExchangeDto: CreateExchangeDto): Promise<any> {
    // validate if exits record.

    const exits = exchangeDB.find(
      (exchange) =>
        exchange.currencyOrigin === createExchangeDto.currencyOrigin &&
        exchange.currencyTarget === createExchangeDto.currencyTarget,
    );
   
    if (exits) {
      throw new BadRequestException(
        `Exchange Rate from ${createExchangeDto.currencyOrigin} to ${createExchangeDto.currencyTarget} already exits.`,
      );
    }

    const result = exchangeDB.push(createExchangeDto);
    if (!result) {
      throw new BadRequestException();
    }
    return createExchangeDto;
  }

  async updateExchangeRate(updateExchangeRate : UpdateExchangeDto){
    const exits = exchangeDB.find(
      (exchange) =>
        exchange.currencyOrigin === updateExchangeRate.currencyOrigin &&
        exchange.currencyTarget === updateExchangeRate.currencyTarget,
    );
   
    if (!exits) {
      throw new BadRequestException(
        `Exchange Rate from ${updateExchangeRate.currencyOrigin} to ${updateExchangeRate.currencyTarget} not found.`,
      );
    }
   let modifiedvalue = {}

    const modifiedExchange = exchangeDB.map(obj => {
      if (obj.currencyOrigin === updateExchangeRate.currencyOrigin && obj.currencyTarget === updateExchangeRate.currencyTarget) {
        [obj].slice() 
        return modifiedvalue  = { ...obj, exchangeRate: updateExchangeRate.exchangeRate };
       
      }
      return obj;
         });
         exchangeDB.splice(0, exchangeDB.length, ...modifiedExchange)
    return modifiedvalue;
  }


  async getAllExchangeRate(){
      return exchangeDB
  }


  private async getExchangeRate(
    currencyOrigin: string,
    currencyDestination: string,
  ): Promise<any> {
    const result = exchangeDB.find(
      (exchange) =>
        exchange.currencyOrigin === currencyOrigin &&
        exchange.currencyTarget === currencyDestination,
    );

    if (!result) {
      throw new NotFoundException(
        `Exchange rate from ${currencyOrigin}  to  ${currencyDestination} not found.`,
      );
    }
    return result.exchangeRate;
  }
}
