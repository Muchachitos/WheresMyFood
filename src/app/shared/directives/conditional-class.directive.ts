import { Directive, Renderer2, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
    selector: '[conditionalClass]'
})

export class ConditionalClassDirective implements OnChanges {
    @Input() conditionalClass: { condition: boolean, apply: string, else?: string };

    // better practice to access DOM 
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.conditionalClass.condition) {
            if (!!this.conditionalClass.else) {
                this.renderer.removeClass(this.elementRef.nativeElement, this.conditionalClass.else.trim());
            }
            this.renderer.addClass(this.elementRef.nativeElement, this.conditionalClass.apply.trim());
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, this.conditionalClass.apply.trim());
            if (!!this.conditionalClass.else) {
                this.renderer.addClass(this.elementRef.nativeElement, this.conditionalClass.else.trim());
            }
        }
    }
}