import { Component, OnInit } from '@angular/core';
import { AccountOption } from './account-option.enum';
import { isNumber, isNull } from 'util';
import { BallotService } from 'src/app/shared/services/ballot.service';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { ToastrService } from 'ngx-toastr';

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
  keystore: string;

  availableAccountOptions: string[];

  constructor(private accountService: AccountsService, private toastrService: ToastrService) {
    this.accountOption = AccountOption.ACCOUNT;
    this.availableAccountOptions = Object.keys(AccountOption).filter(x => isNaN(+x));
  }

  ngOnInit() {
  }

  createEthAccount(): void {
    const account = this.accountService.createAccount();
    this.newAccount = account.address;
    this.toastrService.success('Created New Account at ' + this.newAccount);
    this.keystore = JSON.stringify(account.encrypt(account.privateKey, this.newPassword), null, 4);
  }

  copyText($event): void {
    $event.target.select();
  }
}
