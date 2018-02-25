import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth/auth.service';
import { AppConfig } from '../../../app.config';
import { OrderCreatedModel } from '../../../orders/order/order-created.model';

@Injectable()
export class NotificationHubService {
    private userRegistered: Subject<boolean>;
    private orderCreated: Subject<OrderCreatedModel>;
    private hubConnection: HubConnection;

    constructor(private authService: AuthService) {
        this.userRegistered = new Subject();
        this.orderCreated = new Subject();
        this.hubConnection = new HubConnection(`${AppConfig.apiUrl}/notifyHub`);

        this.authService.onUserLoggedIn().subscribe(() => {
            this.hubConnection = new HubConnection(`${AppConfig.apiUrl}/notifyHub?token=${authService.getToken()}`);
            this.registerServerEvents();
            this.startConnection();
        });

        this.registerServerEvents();
        this.startConnection();
    }

    public onUserRegistered(): Observable<boolean> {
        return this.userRegistered.asObservable();
    }

    public onOrderCreated(): Observable<OrderCreatedModel> {
        return this.orderCreated.asObservable();
    }

    private registerServerEvents(): void {
        this.hubConnection.on('UserCreated', (isRegistered: boolean) => {
            this.userRegistered.next(isRegistered);
        });

        this.hubConnection.on('OrderCreated', (order: OrderCreatedModel) => {
            this.orderCreated.next(order);
        });


        this.hubConnection.onclose((error: Error) => {
            var counter: any = 0;
            setTimeout(() => {
                if (counter == 5) return;

                console.log('Trying to recconect');
                this.startConnection();
                counter++;
            }, 5000);
        });
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started!');
            })
            .catch(err => console.log('Error while establishing connection!'));
    }
}