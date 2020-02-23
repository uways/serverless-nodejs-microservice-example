import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderDTO } from './dto/order.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  payForOrder(@Body() order: OrderDTO): string {
    const paymentAccepted = this.paymentService.processPayment(order);
    return paymentAccepted ? 'confirm' : 'decline';
  }
}
