import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Module({
  imports: [],
  providers: [OrderRepository],
  exports: [OrderRepository],
})
export class DatabaseModule {
  constructor() {
    console.log('Constructing DatabaseModule');
  }
}
