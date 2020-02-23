import { Test } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderStatus } from './model/order.model';
import { v4 as uuidv4 } from 'uuid';

class MockOrderService {
  create(): Order {
    const orderUUID: string = uuidv4();
    const order: Order = new Order(orderUUID);
    return order;
  }

  async cancel(uuid: string): Promise<void> {
    console.log(`Cancelling order ${uuid}`);
  }

  async checkStatus(uuid: string): Promise<OrderStatus> {
    const order = new Order(uuid);
    return order.status;
  }
}

describe('OrderController', () => {
  let orderController: OrderController;
  let orderSvc: OrderService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useClass: MockOrderService }],
    }).compile();

    orderSvc = await moduleRef.get<OrderService>(OrderService);
    orderController = await moduleRef.get<OrderController>(OrderController);
  });

  describe('Create order', () => {
    it('should return a new order', async () => {
      const result = new Order(uuidv4());
      jest.spyOn(orderSvc, 'create').mockImplementation(async () => result);
      expect(await orderController.createOrder()).toStrictEqual({ status: result.status, uuid: result.uuid });
    });
  });

  describe('Cancel order', () => {
    it('should call without error', async () => {
      const order = new Order(uuidv4());
      jest.spyOn(orderSvc, 'create').mockImplementation(async () => order);
      jest.spyOn(orderSvc, 'cancel').mockImplementation();
      expect(await orderController.cancelOrder(order.uuid)).toBe(undefined);
    });
  });

  describe('Check order status', () => {
    it('should return order status', async () => {
      const result = new Order(uuidv4());
      jest.spyOn(orderSvc, 'checkStatus').mockImplementation(async () => result.status);
      expect(await orderController.getOrderStatus(result.uuid)).toStrictEqual({ status: result.status });
    });
  });
});
