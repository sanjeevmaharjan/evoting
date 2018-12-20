import { Component, OnInit } from '@angular/core';
import { BallotService } from 'src/app/shared/services/ballot.service';
import { CandidateModel } from 'src/app/shared/models/candidate.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {MsgMetadataModel} from "../../shared/models/msg-metadata.model";
import {IssueModel} from "../../shared/models/issue.model";
import * as BlindSignature from "blind-signatures";

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  candidates: CandidateModel[];

  constructor(private ballotService: BallotService, private router: Router, private toastrService: ToastrService) {}

  ngOnInit() {
    this.candidates = new Array<CandidateModel>();
    this.ballotService.availableIssues().then(numIssues => {
      const issues = new Array<IssueModel>();

      console.log('Number of Issues: ' + numIssues);

      for (let i = 1; i <= numIssues; i++) {
        this.ballotService.issueDescription(i).then(issue => {

          console.log('Number of Candidates: ' + issue.numCandidates);

          for (let j = 1; j <= issue.numCandidates; j++) {
            this.ballotService.optionDescription(j).then(candidate => {
              issue.candidates.push(candidate);
              this.candidates.push(candidate);
            }).catch(err => {
              this.toastrService.error(err);
            });
          }

          issues.push(issue);
        }).catch(err => {
          this.toastrService.error(err);
        });
      }
    }).catch(err => {
      this.toastrService.error(err);
    });
  }

  vote(to: number) {

    console.log('voting to ' + to + ' from ' + this.ballotService.getAccount());
    this.ballotService.vote(to, null).then(success => {
      if (success) {
        console.log(success);
        //this.toastrService.success('Voted Successfully.');
        this.router.navigate(['user/results']);
      } else {
        this.toastrService.error('Unable to cast vote.');
      }
    }).catch(err => this.toastrService.error('User Has not been Verified by Admin'));
  }

}
