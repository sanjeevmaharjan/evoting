import { Component, OnInit } from '@angular/core';
import { EthService } from 'src/app/shared/services/eth.service';
import { Candidate } from 'src/app/shared/models/candidate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  candidates: Candidate[];

  constructor(private ethService: EthService, private router: Router) { }

  ngOnInit() {
    this.ethService.getCandidates().then(candidates => this.candidates = candidates);
  }

  vote(to: number) {
    console.log('voting to ' + to);
    this.ethService.vote(to).then(success => {
      if (success) {
        this.router.navigate(['results']);
      }
    });
  }

}
