import { Component, OnInit } from '@angular/core';
import { BallotService } from 'src/app/shared/services/ballot.service';
import { CandidateModel } from 'src/app/shared/models/candidate.model';
import {IssueModel} from "../../shared/models/issue.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  candidates: CandidateModel[];

  constructor(private ballotService: BallotService, private toastrService: ToastrService) {}

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

}
