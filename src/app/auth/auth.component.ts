import { Component } from "@angular/core";
import { trigger, transition, animate, keyframes, style } from '@angular/animations';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    animations: [
        trigger('authTabAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateY(-50%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateY(-20%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateY(-10%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateY(0)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
                ]))
            ])
        ]),
        trigger('tabContentAnimation', [
            transition('void => *', [
                animate('0.5s 0.6s ease-in', keyframes([
                    style({ opacity: 0.55, transform: 'translateX(-20%)', offset: 0 }),
                    style({ opacity: 0.6, transform: 'translateX(-5%)', offset: 0.08 }),
                    style({ opacity: 0.9, transform: 'translateX(-2%)', offset: 0.2 }),
                    style({ opacity: 0.9, transform: 'translateX(0)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0.5 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
                ]))
            ])
        ])
    ]
})

export class AuthComponent { }