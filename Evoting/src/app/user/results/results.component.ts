import { Component, OnInit } from '@angular/core';
import { EthService } from 'src/app/shared/services/eth.service';
import { Candidate } from 'src/app/shared/models/candidate.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  candidates: Candidate[];

  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.ethService.getCandidates().then(candidates => {
      this.candidates = candidates;
      console.log("got list of candidates");
    });
  }

}
