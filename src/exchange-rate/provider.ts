import { DataSource } from 'typeorm';
import { Exchange } from './entity/exchange.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: ':memory:',       
        synchronize: true,
        entities: [Exchange]      
      });
      return dataSource.initialize();
    },
  },
];