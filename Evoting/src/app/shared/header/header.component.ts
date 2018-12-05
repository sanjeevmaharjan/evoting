import { Component, OnInit } from '@angular/core';
import { EthService } from '../services/eth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  images = [
    'assets/img/bgslides/1.jpg',
    'assets/img/bgslides/2.jpg',
    'assets/img/bgslides/3.jpg'
  ];

  public isCollapsed = false;

  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.ethService.getAccountInfo().then(account => console.log(this.isLoggedIn = account ? true: false));
    this.ethService.isAdmin().then(check => this.isAdmin = check);
  }

}
