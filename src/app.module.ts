import { AuthModule } from './auth/auth.module';

import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
   
    ConfigModule.forRoot({
      isGlobal: true,
    }),     
    AuthModule,  
  ],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService,  ],
  exports: []
})
export class AppModule {}
