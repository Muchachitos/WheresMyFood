import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { PaginationModel } from "./pagination.model";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})

export class AppPaginationComponent implements OnInit{
    @Input() totalNumberOfPages: number;
    @Input() numberOfPagesToShow: number;
    @Output() pageChange: EventEmitter<PaginationModel> = new EventEmitter<PaginationModel>();

    private pagesIndexes: number[] = [];
    private canMakeOrder: boolean;
    private currentPage: number = 1;

    ngOnInit(): void {
        this.initializePages(this.totalNumberOfPages, this.numberOfPagesToShow, this.pagesIndexes);
    }

    previousPage(event: Event){
        if(this.currentPage == 1) return;
       
        if((!this.pagesIndexes.find(x=> x == 1)) &&
            (this.currentPage <= this.pagesIndexes[0] || this.currentPage > this.pagesIndexes[this.numberOfPagesToShow -1])){
                this.levelUpDownPage(-1, this.currentPage,this.totalNumberOfPages, this.numberOfPagesToShow, this.pagesIndexes);        
        }        
    
        this.currentPage --;
        this.pageChange.emit(new PaginationModel(this.currentPage));
    }

    nextPage(event: Event){
        if(this.currentPage == this.totalNumberOfPages) return;

        if((!this.pagesIndexes.find(x=> x == this.totalNumberOfPages)) &&
            this.currentPage >= this.pagesIndexes[this.numberOfPagesToShow - 1]) {
                this.levelUpDownPage(1, this.currentPage,this.totalNumberOfPages, this.numberOfPagesToShow, this.pagesIndexes);
        }
    
        this.currentPage++;
        this.pageChange.emit(new PaginationModel(this.currentPage));
    }

    goToPage(index: number){
        this.currentPage = index;
        this.pageChange.emit(new PaginationModel(this.currentPage));
    }


    private initializePages(totalNumberOfPages: number, numberOfPagesToShow: number, array: Array<any>) {
        for(let i = 1; i <= numberOfPagesToShow && i <= totalNumberOfPages; i++){
            this.pagesIndexes.push(i);
        }
    }

    private levelUpDownPage(levelUpDown: number, currentPage: number, totalNumberOfPages: number, numberOfPagesToShow: number, array: Array<any>){
        if(currentPage + levelUpDown <= totalNumberOfPages && currentPage + levelUpDown > 0){
            if(currentPage + levelUpDown < currentPage){
                array.splice(0,0,array[0] + levelUpDown);
                array.pop(); 
            }else{
                array.push(array[array.length - 1] + levelUpDown);
                array.shift();
            }
        }
    }
}