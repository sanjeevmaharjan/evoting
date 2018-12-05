import { Component, OnInit } from '@angular/core';
import { AccountOption } from './account-option.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  accountOption: number;

  availableAccountOptions: string[] = Object.values(AccountOption);

  constructor() {
    this.accountOption = AccountOption.ACCOUNT;
  }

  setByAccount(): void {
    this.accountOption = AccountOption.ACCOUNT;
  }

  setByMetaMask(): void {
    this.accountOption = AccountOption.METAMASK;
  }

  setByCreation(): void {
    this.accountOption = AccountOption.CREATE;
  }

  byAccount(): boolean {
    return this.accountOption === AccountOption.ACCOUNT;
  }

  byMetaMask(): boolean {
    return this.accountOption === AccountOption.METAMASK;
  }

  byCreation(): boolean {
    return this.accountOption === AccountOption.CREATE;
  }

  ngOnInit() {
  }

}
