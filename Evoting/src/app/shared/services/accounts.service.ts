import { Injectable, Inject } from '@angular/core';
import {EthService} from "./eth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private web3;

  constructor(private ethService: EthService) {

    this.web3 = this.ethService.getWeb3();

    // set default account
    this.getAccountInfo().then(account => this.web3.eth.defaultAccount = account);

    this.web3.eth.getAccounts().then(x => console.log(JSON.stringify(x)));
    console.log(this.web3.eth.accounts.wallet);
  }

  public getAccountInfo(): Promise<string|null> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getCoinbase().then(account => {
        console.log(account);
        return resolve(account);
      });
    });
  }

  public isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAccountInfo().then(account => {
        console.log('Account in use: ' + account);
        if (!this.web3.eth.defaultAccount) {
          return resolve(false);
        }
        return resolve(account === this.web3.eth.defaultAccount.toLowerCase());
      });
    });
  }

  public unlock(address: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.web3.eth.personal.unlockAccount(address, password, 600).then(success => {
        if (success) {
          console.log('Account: ' + address + ' Unlocked.');
          return resolve(true);
        }
        else {
          return reject('Could not Unlock Account');
        }
      });
    });
  }

  /** Create a new account */
  public createAccount(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.web3.eth.personal.newAccount(password).then( account => {
        return resolve(account);
      });
    });
  }
}
