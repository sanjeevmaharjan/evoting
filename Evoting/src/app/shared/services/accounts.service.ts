import { Injectable, Inject } from '@angular/core';
// Web3
import * as Web3 from 'web3';

// RXJS
import { Observable, bindNodeCallback, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

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
            this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        window.web3 = new Web3(this.web3Provider);

        // set default account
        window.web3.eth.defaultAccount = '0x8C6d30e7F2096FB3A949f886629328C7AEEE7A2B';
    }

    public getAccountInfo(): Promise<string> {
        return new Promise((resolve, reject) => {
          window.web3.eth.getCoinbase(function (err, account) {
            return resolve(String(account));
          });
        });
      }
    
      public isAdmin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
          this.getAccountInfo().then(account => {
            console.log(account);
            return resolve(account === window.web3.eth.defaultAccount.toLowerCase());
          });
        });
      }
}
