import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { PaymentModule } from './payment.module';

const express = require('express');

const binaryMimeTypes: string[] = [];

let cached: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cached) {
    const app = express();
    const nestApp = await NestFactory.create(PaymentModule, new ExpressAdapter(app));
    nestApp.use(eventContext());
    await nestApp.init();
    cached = createServer(app, undefined, binaryMimeTypes);
  }
  return cached;
}

export const handler: Handler = async (event: any, context: Context) => {
  const server = await bootstrapServer();
  return proxy(server, event, context, 'PROMISE').promise;
};
