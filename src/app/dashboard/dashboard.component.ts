import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
viewOutlet : boolean = false; 


  ngOnInit(): void {
  }
    constructor(private router: Router, private route: ActivatedRoute) {}

  navigateTo(path: string ): void {
    this.viewOutlet = true;
    this.router.navigate(['/' + path]);

  }

}
