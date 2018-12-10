import { Injectable, Inject } from '@angular/core';
// Web3
import * as Web3 from 'web3';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private web3Provider: null;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    }
    window.web3 = new Web3(this.web3Provider);

    // set default account
    this.getAccountInfo().then(account => window.web3.eth.defaultAccount = account);

    window.web3.eth.getAccounts().then(x => console.log(JSON.stringify(x)));
    console.log(window.web3.eth.accounts.wallet);
  }

  public getAccountInfo(): Promise<string|null> {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase().then(account => {
        console.log(account);
        return resolve(account);
      });
    });
  }

  public isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAccountInfo().then(account => {
        console.log('Account in use: ' + account);
        if (!window.web3.eth.defaultAccount) {
          return false;
        }
        return resolve(account === window.web3.eth.defaultAccount.toLowerCase());
      });
    });
  }

  /** Create a new account */
  public createAccount(): any {
    return window.web3.eth.accounts.create();
  }
}
