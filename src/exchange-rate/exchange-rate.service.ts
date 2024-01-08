/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { responseExchange } from './interfaces/response.interface';
import { exchangeDB} from '../exchange-rate/data/exchange'
import { Repository } from 'typeorm';
import { CreateExchangeDto } from '../exchange-rate/dto/createExchange.dto'
import { Exchange } from '../exchange-rate/entity/exchange.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ExchangeRateService {
    constructor(
        @Inject('EXCHANGE_REPOSITORY')
        private exchangeRepository: Repository<Exchange>,
      ){}
  async  getExchange(amount: number, currencyOrigin: string, currencyDestination : string ): Promise<responseExchange> {

        // get exchange-type by currency origin
     
        const exchangeRate = await this.getExchangeRate(currencyOrigin, currencyDestination)
   
        if (!exchangeRate) {
           return
        } 

        // calculate 
     
        const exchangeAmount  = amount * exchangeRate 
   
        const response : responseExchange  = {
            initialAmount: amount,
            amountWithExchange: exchangeAmount,
            currencyOrigin: currencyOrigin,
            currencyDestinity: currencyDestination,
            exchangeRate: exchangeRate as number
        }
   
       return response;
     }

    async insertExchange(createExchangeDto : CreateExchangeDto) {

       const result = this.exchangeRepository.create(createExchangeDto);
       return await this.exchangeRepository.save(result);
     }

     private async  getExchangeRate(currencyOrigin: string, currencyDestination : string) : Promise<any> {
      //  const result =  exchangeDB.find(exchange => exchange.currencyOrigin === currencyOrigin && exchange.currencyTarget === currencyDestination)
    
      const result = await this.exchangeRepository.find({
        where: {
            currencyOrigin: currencyOrigin,
            currencyTarget: currencyDestination,
        },
    });
   
      if (!result || result.length === 0) {
        throw new NotFoundException(`Exchange rate from ${currencyOrigin}  to  ${currencyDestination} not found.`);
      }     
      return result[0].exchangeRate
    }

}
