export enum OrderStatus {
  Created = 'created',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
  Delivered = 'delivered',
}

export class Order {
  private _uuid: string;
  private _status: OrderStatus;

  constructor(uuid: string) {
    this._uuid = uuid;
    this._status = OrderStatus.Created;
  }

  public get uuid(): string {
    return this._uuid;
  }

  public get status(): OrderStatus {
    return this._status;
  }

  public set status(status: OrderStatus) {
    this._status = status;
  }
}
