import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/component/nav-bar/nav-bar.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  istoggle: boolean = true;

  constructor(
    private location: LocationStrategy,
    private navService: NavBarService
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {
    this.navService.navbar_subject.asObservable().subscribe(
      (data) => {
        this.istoggle = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
