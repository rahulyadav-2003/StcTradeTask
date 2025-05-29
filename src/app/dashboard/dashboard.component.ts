import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
viewOutlet: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Optional: control viewOutlet based on route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        // Show outlet only for valid child routes
        this.viewOutlet = ['/pi', '/po', '/quotation'].includes(currentUrl);
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate(['/' + path]);
  }
}
