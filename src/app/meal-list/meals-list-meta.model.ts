export class MealsListMetaModel {
    totalNumberOfPages: number;
    totalNumberOfItems: number;
    numberOfPagesToShow: number;
    numberOfItemsToShow: number;

    constructor(totalNumberOfPages:number, 
                totalNumberOfItems: number, 
                numberOfPagesToShow: number, 
                numberOfItemsToShow: number){
        this.totalNumberOfPages = totalNumberOfPages;
        this.totalNumberOfItems = totalNumberOfItems;
        this.numberOfPagesToShow = numberOfPagesToShow;
        this.numberOfItemsToShow = numberOfItemsToShow;
    }
}