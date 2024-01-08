import { AuthModule } from './auth/auth.module';

import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchange } from './exchange-rate/entity/exchange.entity';
import { databaseProviders } from '././exchange-rate/provider';
import { photoProviders } from './exchange-rate/exchange-rate.providers';

@Module({
  imports: [
   
    ConfigModule.forRoot({
      isGlobal: true,
    }),     
    AuthModule,  
  ],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService,  ...databaseProviders, ...photoProviders],
  exports: [...databaseProviders]
})
export class AppModule {}
