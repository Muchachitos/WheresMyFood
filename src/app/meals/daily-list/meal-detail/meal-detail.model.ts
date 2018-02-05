export class MealDetailModel {
    public Id: number;
    public Name: string;
    public Description: string;
    public Image: string;
    public IsOrdered: boolean;
    public OrderList: OrderList[];

    constructor() {
        this.OrderList = [];
    }
}

export class OrderList {
    public Firstname: string;
    public Lastname: string;
    public LastTimeOrdered: Date;
    public HasOrdered: boolean;
}