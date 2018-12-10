import { Component, OnInit } from '@angular/core';
import { BallotService } from '../services/ballot.service';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  account = '';
  isAdmin: boolean;

  images = [
    'assets/img/bgslides/1.jpg',
    'assets/img/bgslides/2.jpg',
    'assets/img/bgslides/3.jpg'
  ];

  public isCollapsed = false;

  constructor(private accountService: AccountsService) { }

  ngOnInit() {
    this.accountService.isAdmin().then(check => this.isAdmin = check);
  }

}
