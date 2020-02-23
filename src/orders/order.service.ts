import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Order, OrderStatus } from './model/order.model';
import { OrderRepository } from './db/order.repository';
import { OrderMachine } from './fsm/fsm';
import { PaymentAPI } from './api/payment.api';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: OrderRepository, private readonly paymentAPI: PaymentAPI) {}

  async create(): Promise<Order> {
    const orderUUID: string = uuidv4();
    const order: Order = new Order(orderUUID);
    await this._processOrder(order);
    console.log(`Order ${order.uuid} created`);
    return order;
  }

  async cancel(uuid: string): Promise<void> {
    console.log(`Cancelling order ${uuid}`);
    const order = await this.orderRepo.fetch(uuid);
    this._transitionState(order, 'cancel');
  }

  async checkStatus(uuid: string): Promise<OrderStatus> {
    const order = await this.orderRepo.fetch(uuid);
    return order.status;
  }

  async _processOrder(order: Order): Promise<void> {
    await this.orderRepo.save(order);
    const randomPaymentToken = uuidv4();
    const paymentOutcome: string = await this.paymentAPI.pay(order, randomPaymentToken);
    console.log('Payment outcome: ', paymentOutcome);
    const transitionedOrder: Order = await this._transitionState(order, paymentOutcome);

    (async () => {
      await sleep(5000); // Artificial delay
      this._deliverOrder(transitionedOrder);
    })();
  }

  async _deliverOrder(order: Order): Promise<void> {
    console.log(`Attempting delivery of ${order.uuid} (if not cancelled)`);
    await this._transitionState(order, 'deliver');
  }

  async _transitionState(order: Order, transition: string): Promise<Order> {
    const fetchedOrder: Order = await this.orderRepo.fetch(order.uuid);
    const nextState: OrderStatus = OrderMachine.transition(order.status, transition).value as OrderStatus;
    fetchedOrder.status = nextState;
    this.orderRepo.save(fetchedOrder);
    return fetchedOrder;
  }
}
