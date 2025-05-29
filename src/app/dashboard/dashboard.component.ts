import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 viewOutlet: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkRoute(this.router.url); // for first load

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  private checkRoute(url: string): void {
    // If URL is only root '/', hide outlet
    // If URL is '/pi', '/po', or '/quotation', show outlet
    this.viewOutlet = ['/pi', '/po', '/quotation'].some(path => url.startsWith(path));
  }

  navigateTo(path: string): void {
    this.router.navigate(['/' + path]);
  }
}
