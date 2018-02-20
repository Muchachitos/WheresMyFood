import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';

@Injectable()
export class SignalRService {
    private userRegistered: Subject<boolean>;
    private hubConnection: HubConnection;

    constructor() {
        this.userRegistered = new Subject();
        this.hubConnection = new HubConnection(`${AppConfig.apiUrl}/notifyHub`);

        this.hubConnection.onclose((error: Error) => {
            var counter: any = 0;
            setTimeout(() => {
                if (counter == 5) return;

                console.log('trying to recconect');
                this.startConnection();
                counter++;
            }, 5000);
        });

        this.registerServerEvents();
        this.startConnection();
    }

    public onUserRegistered(): Observable<boolean> {
        return this.userRegistered.asObservable();
    }

    private registerServerEvents(): void {
        this.hubConnection.on('UserRegistered', (isRegistered: boolean) => {
            this.userRegistered.next(isRegistered);
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