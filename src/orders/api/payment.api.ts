import { Injectable, HttpService } from '@nestjs/common';
import { Order } from '../model/order.model';

@Injectable()
export class PaymentAPI {
  constructor(private readonly httpService: HttpService) {}

  async pay(order: Order, token: string): Promise<string> {
    const response = await this.httpService
      .post(
        `${process.env.APIG_URL}/payments`,
        { token, order: { uuid: order.uuid, status: order.status } },
        { headers: { 'content-type': 'application/json' } }
      )
      .toPromise()
      .then(r => r.data);
    return response;
  }
}
