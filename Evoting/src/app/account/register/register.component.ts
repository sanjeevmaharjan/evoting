import { Component, OnInit } from '@angular/core';
import { AccountOption } from './account-option.enum';
import { isNumber, isNull } from 'util';
import { BallotService } from 'src/app/shared/services/ballot.service';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { ToastrService } from 'ngx-toastr';
import {MsgMetadataModel} from "../../shared/models/msg-metadata.model";
import {RegistrationModel} from "./registration.model";
import {Router} from "@angular/router";

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
  publicKey: string;

  availableAccountOptions: string[];

  constructor(private accountService: AccountsService, private toastrService: ToastrService, private ballotService: BallotService, private router: Router) {
    this.accountOption = AccountOption.ACCOUNT;
    this.availableAccountOptions = Object.keys(AccountOption).filter(x => isNaN(+x));
  }

  ngOnInit() {
  }

  createEthAccount(): void {
    const account = this.accountService.createAccount(this.newPassword).then(account => {
      this.newAccount = account;
      this.toastrService.success('Created New Account at ' + this.newAccount);
    });
  }

  copyText($event): void {
    $event.target.select();
  }

  submit(): void {
    /*this.accountService.unlock(this.newAccount, this.newPassword).then(x => {
      if (x) {
        this.ballotService.addVoter(this.name, this.publicKey, new MsgMetadataModel(this.newAccount)).then();
      }
    });*/
    const registration = new RegistrationModel();
    registration.name = this.name;
    registration.address = this.newAccount;
    registration.pk = 'test';
    this.accountService.registerVoter(registration).subscribe(val => {
      console.log(val);
      this.router.navigate(['account/login']);
      /*if (val.success) {
        this.toastrService.success('Account registered.');
      } else {
        this.toastrService.error('Error occured: ' + val.error);
      }*/
    });
  }
}
