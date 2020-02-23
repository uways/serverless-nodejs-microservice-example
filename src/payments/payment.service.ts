import { Injectable } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';

@Injectable()
export class PaymentService {
  processPayment(orderDTO: OrderDTO): boolean {
    console.log('orderDTO', orderDTO);
    console.log(`Processing order ${orderDTO.order.uuid}`);
    return Math.random() >= 0.5;// Return random result
  }
}
