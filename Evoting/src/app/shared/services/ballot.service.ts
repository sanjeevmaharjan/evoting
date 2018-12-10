import { Injectable } from '@angular/core';
import { CandidateModel} from '../models/candidate.model';
import { AccountsService } from './accounts.service';
import {EthService} from "./eth.service";
import {MsgMetadataModel} from "../models/msg-metadata.model";
import {IssueModel} from "../models/issue.model";
import {promise} from "selenium-webdriver";

declare let require: any;
const tokenAbi = require('../../../../../build/contracts/Ballot.json');
@Injectable({
  providedIn: 'root'
})
export class BallotService {
  private web3;
  private contract;

  constructor(private accountService: AccountsService, private ethService: EthService) {
    this.web3 = this.ethService.getWeb3();
    this.contract = new this.web3.eth.Contract(tokenAbi.abi, tokenAbi.networks[5777].address);
  }

  getAccount(): string {
    return this.web3.eth.defaultAccount;
  }

  addCandidate(issueId: number, name: string, description: string, msg: MsgMetadataModel): Promise<number> {
    var enc = new TextEncoder();
    return new Promise<number>(((resolve, reject) => {
      this.contract.methods.registerCandidate(issueId, enc.encode(name), description).call(msg).then( id =>{
        return resolve(id);
      });
    }));
  }

  addVoter(address: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getCoinbase((err, account) => {
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
        return this.contract.methods.votersAddress(0).call()
          .catch(function (err) {
            console.error(err);
          });
      });
    });
  }

  // needs sender
  vote(candidate: number, msg: MsgMetadataModel): Promise<boolean> {
    this.web3.eth.defaultAccount = msg.from;
    return new Promise((resolve, reject) => {
      this.contract.methods.vote(candidate).call().then().catch(err => reject(err));
    });
  }

  availableIssues(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.contract.methods.availableIssues().call().then(numIssues => {
        return resolve(numIssues);
      }).catch(err => {
        reject(err);
      });
    })
  }

  issueDescription(issueId: number): Promise<IssueModel> {
    return new Promise<IssueModel>((resolve, reject) => {
      this.contract.methods.issueDescription(issueId).call().then(iss => {
        let issue = new IssueModel();
        issue.id = iss.id;
        issue.name = iss.name;
        issue.description = iss.description;
        issue.numCandidates = iss.candidatesTracker;
        issue.candidates = new Array<CandidateModel>();

        return resolve(issue);
      }).catch(err => {
        reject(err);
      });
    })
  }
  optionDescription(optionId: number): Promise<CandidateModel> {
    return new Promise((resolve, reject) => {
      this.contract.methods.optionDescription(optionId).call().then(cand => {
        let candidate: CandidateModel = new CandidateModel();
        candidate.id = cand.id;
        candidate.name = this.web3.utils.hexToUtf8(cand.name);
        candidate.description = this.web3.utils.hexToUtf8(cand.description);
        candidate.voteCount = cand.voteCount;

        return resolve(candidate);
      }).catch(err => {
        reject(err);
      });
    });
  }


  /*getCandidates(): Promise<IssueModel[]> {
    return new Promise((resolve, reject) => {
      this.contract.methods.availableIssues().call().then(numIssues => {
        const issues = new Array<IssueModel>();

        console.log('Number of Issues: ' + numIssues);

        for (let i = 1; i <= numIssues; i++) {
          this.contract.methods.issueDescription(i).call().then(iss => {
            let issue = new IssueModel();
            issue.id = iss.id;
            issue.name = iss.name;
            issue.description = iss.description;
            issue.candidates = new Array<CandidateModel>();

            console.log('Number of Candidates: ' + iss.candidatesTracker);

            for (let j = 1; j < iss.candidatesTracker; j++) {
              this.contract.methods.optionDescription(j).call().then(cand => {
                let candidate: CandidateModel = new CandidateModel();
                candidate.id = cand.id;
                candidate.name = this.web3.utils.hexToUtf8(cand.name);
                console.log(cand.name);
                candidate.description = this.web3.utils.hexToUtf8(cand.description);
                console.log(cand.description);
                candidate.voteCount = cand.voteCount;

                issue.candidates.push(candidate);

                if (i == numIssues) {
                  return resolve(issues);
                }
              });
            }

            issues.push(issue);
          });
        }
      });
    });
  }*/
}
