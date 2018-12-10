import { Component, OnInit } from '@angular/core';
import { EthService } from '../services/eth.service';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  account = '';
  isAdmin: boolean;
  isLoggedIn: boolean;

  images = [
    'assets/img/bgslides/1.jpg',
    'assets/img/bgslides/2.jpg',
    'assets/img/bgslides/3.jpg'
  ];

  public isCollapsed = false;

  constructor(private accountService: AccountsService) { }

  ngOnInit() {
    this.accountService.isAdmin().then(check => this.isAdmin = check);
    this.accountService.getAccountInfo().then(
      val => {
        if (val) {
          this.account = val;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        console.log(this.isLoggedIn);
      },
      err => console.log(err)
    );
  }

}
