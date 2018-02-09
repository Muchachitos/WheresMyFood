export class MealDetailModel {
    public id: number;
    public name: string;
    public description: string;
    public image: string;
    public isOrdered: boolean;
    public orderList: UserOrder[];

    constructor() {
        this.orderList = [];
    }
}

export class UserOrder {
    public userId: number;
    public orderId?: number;
    public firstName: string;
    public lastName: string;
    public lastTimeOrdered: Date;
    public loggedInUserOrdered: boolean;
    public hasOrdered: boolean;
}