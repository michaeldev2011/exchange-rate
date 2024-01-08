import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('exchange')
export class Exchange {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ name: 'currencyOrigin', length: 3, nullable: false })
    currencyOrigin: string;
  
    @Column({ name: 'currencyTarget', length: 3, nullable: false })
    currencyTarget: string;
  
    @Column({ name: 'exchangeRate', type: 'float', nullable: false })
    exchangeRate: number; 
  }