import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router, public toastr: ToastsManager, viewContainerRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(viewContainerRef);

    // razmisliti o ucitavanju konfiguracije odmah na pocetku... tipa meta podaci za jelo itd...
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}