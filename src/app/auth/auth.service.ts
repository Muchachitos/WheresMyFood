import { LoggingService } from "../common/services/logging.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
    constructor(private loggingService: LoggingService) { }

    private loggedIn = false;

    private accounts = [{
        name: 'Mika Mikic'
    },
    {
        name: 'Pera Peric'
    },
    {
        name: 'Zika Zikic'
    },
    {
        name: ' Zuca Zutic'
    }];

    login(){
        this.loggedIn = true;
    }

    logout(){
        this.loggedIn = false;
    }

    register(){
    }

    isAuthenticated() {
        let promise = new Promise((resolve,reject) =>{
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 800);
        });

        return promise;
    }

    delete(){
    }

    update(){
    }
}