import { Component, OnInit } from '@angular/core';
import { AccountOption } from './account-option.enum';
import { isNumber, isNull } from 'util';
import { EthService } from 'src/app/shared/services/eth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  accountOption: number;
  existingAccount: string;
  newAccount: string;
  newPassword: string;

  availableAccountOptions: string[];

  constructor(private ethService: EthService) {
    this.accountOption = AccountOption.ACCOUNT;
    this.availableAccountOptions = Object.keys(AccountOption).filter(x => isNaN(+x));
  }

  ngOnInit() {
  }

  createEthAccount(): void {
    this.ethService.createAccount(this.newPassword).then(x => {
      console.log('Created new Account: ' + x);
      this.newAccount = x;
    });
  }
}
