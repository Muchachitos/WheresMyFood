import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[scrollStop]'
})

export class ScrollStopDirective{
    @HostListener('click', ['$event'])
    public onClick(event: any): void{
        event.preventDefault();
        event.stopPropagation();
    }
}