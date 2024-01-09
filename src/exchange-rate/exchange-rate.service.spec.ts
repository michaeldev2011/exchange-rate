import { Test } from '@nestjs/testing';
import { ExchangeRateService } from './exchange-rate.service';
import { CreateExchangeDto } from './dto/createExchange.dto';
import { UpdateExchangeDto } from './dto/updateExchange.dto';
import { BadRequestException } from '@nestjs/common';

describe('ExchangeRateService', () => {
  let Service: ExchangeRateService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({     
      providers: [ExchangeRateService,  ], // Add
    }).compile();

    Service =
      moduleRef.get<ExchangeRateService>(ExchangeRateService);
  });

  it('should be defined', () => {
    expect(Service).toBeDefined();
  });

  it('should create a exchange-rate', async () => {
    const createExchangeDto : CreateExchangeDto = { 
      currencyOrigin : "CLP",      
      currencyTarget : "PEN",
      exchangeRate : 62.3
    };
    expect(await Service.insertExchange(createExchangeDto)).toEqual(createExchangeDto);
  });
  
  it('should update a exchange-rate', async () => {
    const updateExchangeDto : UpdateExchangeDto = { 
      currencyOrigin : "CLP",      
      currencyTarget : "PEN",
      exchangeRate : 100
    };
    expect(await Service.updateExchangeRate(updateExchangeDto)).toEqual(updateExchangeDto);
  });

  it('should calculate exchange-rate', async () => {
    const amount = 20
    const currencyOrigin = "CLP"
    const currencyDestination = "PEN"

    expect(await Service.getExchange(amount, currencyOrigin, currencyDestination )).toEqual({"amountWithExchange": 2000, "currencyDestinity": "PEN", "currencyOrigin": "CLP", "exchangeRate": 100, "initialAmount": 20});
  });

});
