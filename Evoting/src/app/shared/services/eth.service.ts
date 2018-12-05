import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { Candidate } from '../models/candidate.model';
import { AccountsService } from './accounts.service';
import { Converter } from '../utils/converter';

declare let require: any;
declare let window: any;
const tokenAbi = require('../../../../../build/contracts/Ballot.json');
@Injectable({
  providedIn: 'root'
})
export class EthService {
  private web3Provider: null;
  private contract;

  constructor(private accountService: AccountsService) {

    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    window.web3 = new Web3(this.web3Provider);

    // set default account
    window.web3.eth.defaultAccount = '0x8C6d30e7F2096FB3A949f886629328C7AEEE7A2B';

    //this.contract = TruffleContract(tokenAbi);

    // window.web3.eth.net.getId().then(id => {
    //   console.log(id);
    //   console.log(tokenAbi.networks[id])
    // });
    
    this.contract = new window.web3.eth.Contract(tokenAbi.abi, tokenAbi.networks[5777].address);
    console.log(this.contract.methods);
  }

  addVoter(address: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((err, account) => {
        return this.contract.methods.giveRightToVote(address)
          .call({ from: account })
            .then(function (status) {
              if (status) {
                console.log(status);
                return resolve(status);
              }
            }).catch(function (error) {
                console.error(error);
                return reject('Error in adding voter');
              });
      });
    });
  }

  getVotersList(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.accountService.getAccountInfo().then(account => {
        return this.contract.methods.votersAddress(0).call({ from: account })
          .catch(function (err) {
            console.error(err);
          });
      });
    });
  }

  vote(candidate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.accountService.getAccountInfo().then(account => {
        this.contract.methods.vote(candidate).call({ from: account }).then(function (status) {
          console.log(candidate);
          if (status) {
            console.log(status);
            return resolve(true);
          }
        }).catch(function (error) {
          console.error(error);
          return reject('Error in Voting');
        });
      });
    });
  }

  getCandidates(): Promise<Candidate[]> {
    return new Promise((resolve, reject) => {
      this.accountService.getAccountInfo().then(account => {
        this.contract.methods.candidatesCount().call().then(count => {
          let candidates = new Array<Candidate>();
          for (let i = 0; i < count; i++) {
            this.contract.methods.candidates(i).call().then(candidate => {
              candidates[i] = new Candidate();
              candidates[i].id = i;
              candidates[i].name = window.web3.utils.hexToUtf8(candidate[0]);
              candidates[i].voteCount = candidate[1];
            });
          }
          return resolve(candidates);
        });
      });
    });
  }
}
