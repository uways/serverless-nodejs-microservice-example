import { Injectable } from '@nestjs/common';
import { Order } from '../model/order.model';

const dynamoose = require('dynamoose');

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ region: 'ap-southeast-1' });
dynamoose.setDDB(dynamoDB);

const OrderModel = dynamoose.model('Order', { uuid: String, status: String });

@Injectable()
export class OrderRepository {
  async save(order: Order): Promise<Order> {
    await new OrderModel({ uuid: order.uuid, status: order.status }).save();
    const savedOrder = await OrderModel.get(order.uuid);
    return savedOrder;
  }

  async fetch(uuid: string): Promise<Order> {
    const order: Order = await OrderModel.get(uuid);
    return order;
  }
}
