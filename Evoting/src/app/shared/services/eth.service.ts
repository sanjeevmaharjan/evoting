import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';
import { Candidate } from '../models/candidate.model';
declare let require: any;
declare let window: any;
const tokenAbi = require('../../../../../build/contracts/Ballot.json');
@Injectable({
  providedIn: 'root'
})
export class EthService {
  private web3Provider: null;
  private contract;
  private instance;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    window.web3 = new Web3(this.web3Provider);

    // set default account
    window.web3.eth.defaultAccount = '0x8C6d30e7F2096FB3A949f886629328C7AEEE7A2B';

    this.contract = TruffleContract(tokenAbi);
    this.contract.setProvider(this.web3Provider);
    this.contract.deployed().then(
      val => this.instance = val,
      err => console.error(err)
    );
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
        console.log(window.web3.eth.defaultAccount.toLowerCase());
        return resolve(account === window.web3.eth.defaultAccount.toLowerCase());
      });
    });
  }

  addVoter(address: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((err, account) => {
        this.contract.deployed().then(
          val => {
            this.instance = val;
            console.log('voting from ' + account);
            return val.giveRightToVote(
              address,
              { from: account }
            ).then(function (status) {
              if (status) {
                console.log(status);
                return resolve(status);
              }
            }).catch(function (error) {
              console.error(error);
              return reject('Error in adding voter');
            });
          },
          error => console.error(error)
        );
      });
    });
  }

  getVotersList(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.getAccountInfo().then(account => {
        this.contract.deployed().then(instance => {
          this.instance = instance;
          return instance.votersAddress(0, { from: account })
            .catch(function (err) {
              console.error(err);
            });
        },
          err => console.error(err)
        );
      });
    });
  }

  vote(candidate: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getAccountInfo().then(account => {
        this.instance.vote(
          candidate,
          { from: account }
        ).then(function (status) {
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
      this.getAccountInfo().then(account => {
        this.contract.deployed().then(
          val => {
            this.instance = val;
            val.candidatesCount().then(count => {
              let candidates = new Array<Candidate>();
              for (let i = 0; i < count; i++) {
                this.instance.candidates(i).then(candidate => {
                  candidates[i] = new Candidate();
                  candidates[i].id = i;
                  candidates[i].name = window.web3.toAscii(candidate[0]);
                  candidates[i].voteCount = candidate[1];
                });
              }
              return resolve(candidates);
            });
          },
          err => console.error(err)
        );
      });
    });
  }
}
