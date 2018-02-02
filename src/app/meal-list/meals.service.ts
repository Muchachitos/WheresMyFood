import { MealModel } from "./meal/meal.model";
import { EventEmitter } from "@angular/core";
import { MealsListMetaModel } from "./meals-list-meta.model";

export class MealsService {
    mealListChanged = new EventEmitter<MealModel[]>();
    private currentCopy: MealModel[] = [];
    private mealMeta: MealsListMetaModel;

    private list : MealModel[] = [{
        Id : 1,
        Name: 'Some name 1',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 3
    },
    {
        Id : 2,
        Name: 'Some name 2',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
        IsOrdered: false,
        NumberOfOrders: 5
    },
    {
        Id : 3,
        Name: 'Some name 3',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
        IsOrdered: false,
        NumberOfOrders: 6
    },
    {
        Id : 4,
        Name: 'Some name 4',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
        IsOrdered: false,
        NumberOfOrders: 2
    },
    {
        Id : 5,
        Name: 'Some name 5',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://los-angeles.eat24hours.com/files/cuisines/v4/thai.jpg',
        IsOrdered: false,
        NumberOfOrders: 1
    },
    {
        Id : 6,
        Name: 'Some name 6',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://los-angeles.eat24hours.com/files/cuisines/v4/thai.jpg',
        IsOrdered: false,
        NumberOfOrders: 0
    },
    {
        Id : 7,
        Name: 'Some name 7',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 3
    },
    {
        Id : 8,
        Name: 'Some name 8',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 3
    },
    {
        Id : 9,
        Name: 'Some name 9',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 2
    },
    {
        Id : 10,
        Name: 'Some name 10',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
        IsOrdered: false,
        NumberOfOrders: 9
    },
    {
        Id : 11,
        Name: 'Some name 11',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
        IsOrdered: false,
        NumberOfOrders: 10
    },
    {
        Id : 12,
        Name: 'Some name 12',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg',
        IsOrdered: false,
        NumberOfOrders: 1
    },
    {
        Id : 13,
        Name: 'Some name 13',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://los-angeles.eat24hours.com/files/cuisines/v4/thai.jpg',
        IsOrdered: false,
        NumberOfOrders: 5
    },
    {
        Id : 14,
        Name: 'Some name 14',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://los-angeles.eat24hours.com/files/cuisines/v4/thai.jpg',
        IsOrdered: false,
        NumberOfOrders: 7
    },
    {
        Id : 15,
        Name: 'Some name 15',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 8
    },
    {
        Id : 16,
        Name: 'Some name 16',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 3
    },
    {
        Id : 17,
        Name: 'Some name 17',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 0
    },
    {
        Id : 18,
        Name: 'Some name 18',
        Description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        Image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg',
        IsOrdered: false,
        NumberOfOrders: 4
    }];

    getMealsMeta(): MealsListMetaModel{
        return new MealsListMetaModel(8,this.list.length,5,8);
    }
    
    getMeals(pageNumber: number, itemsToTake: number){
        if(pageNumber == 1){
            this.currentCopy = this.list.slice(0,itemsToTake);
            return this.currentCopy;
        }else{
            this.currentCopy = this.list.slice((pageNumber -1) * itemsToTake, (pageNumber - 1) * itemsToTake + itemsToTake);
            return this.currentCopy;
        }
    }

    order(meal:MealModel){
        // ToDo: call webapi service
        this.list.forEach(m=> {
            if(m.Id == meal.Id){
                m.IsOrdered = true;
                m.NumberOfOrders++;
            }
            else 
                m.IsOrdered = false;
        });
        this.mealListChanged.emit(this.currentCopy.slice());
    }

    cancel(meal:MealModel){
        // ToDo: call webapi service
        this.list.forEach(m=> {
            m.IsOrdered = false;
            if(meal.Id == m.Id)
                m.NumberOfOrders--;
        });
        this.mealListChanged.emit(this.currentCopy.slice());
    }
}