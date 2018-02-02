export class MealModel {
    public Id : number;
    public Name : string; 
    public Description : string;
    public Image : string;
    public IsOrdered: boolean;
    public NumberOfOrders: number;

    constructor(id:number, name: string, description: string, imagePath: string, isOrdered: boolean, numberOfOrders: number){
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.Image = imagePath;
        this.IsOrdered = isOrdered;
        this.NumberOfOrders = numberOfOrders;
    }
}