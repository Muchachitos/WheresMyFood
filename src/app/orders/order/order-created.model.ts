import { OrderModel } from "./order.model";

export class OrderCreatedModel extends OrderModel {
    public attemptsLeft: number;
}