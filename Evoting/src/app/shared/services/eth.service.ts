import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class EthService {

  private web3Provider;
  private ballotContract;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
    }
    window.web3 = new Web3(this.web3Provider);
  }

  getWeb3() {
    return window.web3;
  }
}
