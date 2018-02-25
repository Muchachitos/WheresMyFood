export class OrderCreatedModel {
    public aggregateId: string;
    public userId: string;
    public mealId: string;
    public userIdToBeOrdered: string;
    public eventOccured: Date;
}