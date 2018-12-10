import { Component, OnInit } from '@angular/core';
import { BallotService } from 'src/app/shared/services/ballot.service';
import { Event, Router } from '@angular/router';

@Component({
  selector: 'app-addvoter',
  templateUrl: './addvoter.component.html',
  styleUrls: ['./addvoter.component.css']
})
export class AddvoterComponent implements OnInit {
  address: string;
  voters: string[];

  constructor(private ethService: BallotService, private router: Router) { }

  ngOnInit() {
    this.ethService.getVotersList().then( function(value: string[]) {
      this.voters = value;
    });
  }

  submit() {
    /*this.ethService.addVoter(this.address).then(
      success => {
        if (success) {
          this.router.navigate(['']);
        }
      }
    );*/
  }

}
