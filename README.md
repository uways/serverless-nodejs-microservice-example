# serverless-nodejs-microservice-example
Example node microservice application using Serverless Framework

## Setup

```bash
npm install
npm db:install
```

## Run tests

```bash
npm test
```

## Running on localhost

```bash
npm run start
```

This will start a local instance of DynamoDB and URL endpoints on http://localhost:3000 using serverless-offline plugin

## Calling endpoints

### Create order
```bash
curl -X POST http://localhost:3000/orders/create
```

### Cancel order
```bash
curl -X PUT http://localhost:3000/orders/{orderUUID}/cancel
```

### Check order status
```bash
curl http://localhost:3000/orders/{orderUUID/status
```
