import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DatabaseModule } from './db/database.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [DatabaseModule, ApiModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
  constructor() {
    console.log('Constructing OrdersModule');
  }
}
