export class MealDetailModel {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public isOrdered: boolean;
    public orderList: OrderList[];

    constructor() {
        this.orderList = [];
    }
}

export class OrderList {
    public firstName: string;
    public lastName: string;
    public lastTimeOrdered: Date;
    public hasOrdered: boolean;
}