import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from '../shared/services/accounts.service';
import { EthService } from '../shared/services/eth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  images = [1, 2, 3].map((val) => `http://localhost:4200/assets/img/bgslides/${val}.jpg`);

  account: string = "...";

  constructor(config: NgbCarouselConfig, private accountService: AccountsService) { 
    // customize default values of carousels used by this component tree
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.accountService.getAccountInfo().then(
      val => {
        this.account = val; console.log(val)
      },
      err => console.log(err)
    );
  }

}
