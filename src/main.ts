import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  const configService = app.get(ConfigService);
 
  const config = new DocumentBuilder()
    .setTitle('Exchange Rate')
    .setDescription('Exchange Rate API. The goal of this API is calculate of exchange rate of severals currency.')
    .setVersion('1.0')
    .addTag('exchange-rate')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('PORT') || 3000); 
  
}
bootstrap();