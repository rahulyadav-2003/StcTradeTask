import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  viewOutlet: boolean = false;
  currentPath: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.urlAfterRedirects.replace('/', '');
        this.viewOutlet = ['pi', 'po', 'quotation'].includes(this.currentPath);
      }
    });
  }

  navigateTo(path: string): void {
    if (this.currentPath === path && this.viewOutlet) {
      // Second click on the same card - hide form
      this.router.navigate(['/']);
    } else {
      // First click or different card - show form
      this.router.navigate(['/' + path]);
    }
  }
}
