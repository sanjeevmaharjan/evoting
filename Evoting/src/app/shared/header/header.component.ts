import { Component, OnInit } from '@angular/core';
import { BallotService } from '../services/ballot.service';
import { AccountsService } from '../services/accounts.service';
import {EthService} from "../services/eth.service";

declare let window: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  /*account = '';*/
  isAccountAdmin: boolean;
  localStorage;
  web3;

  images = [
    'assets/img/bgslides/1.jpg',
    'assets/img/bgslides/2.jpg',
    'assets/img/bgslides/3.jpg'
  ];

  public isCollapsed = false;

  constructor(public ballotService: BallotService, private ethService: EthService) {
    this.web3 = this.ethService.getWeb3();
    this.localStorage = localStorage;
  }

  ngOnInit() {
    this.isAdmin(this.ballotService.getAccount());
  }

  isAdmin(account: string) {
    this.ballotService.isAccountAdmin(this.web3.eth.defaultAccount).then(check => {
      this.ballotService.isAdmin = check;
    });
  }

}
