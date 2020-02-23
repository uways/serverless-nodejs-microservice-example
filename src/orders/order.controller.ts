import { Controller, Get, Post, Put, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  async createOrder(): Promise<object> {
    const order = await this.orderService.create();
    return { uuid: order.uuid, status: order.status };
  }

  @Put(':uuid/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  cancelOrder(@Param('uuid') uuid: string): void {
    this.orderService.cancel(uuid);
  }

  @Get(':uuid/status')
  async getOrderStatus(@Param('uuid') uuid: string): Promise<object> {
    const status = await this.orderService.checkStatus(uuid);
    return { status };
  }
}
