class Order {
    public uuid: string = '';
    public status: string = '';
}

export class OrderDTO {
    public order: Order = new Order;
    public token: string = '';
}