import { Component, OnInit } from '@angular/core';
import {BallotService} from "../../shared/services/ballot.service";
import {MsgMetadataModel} from "../../shared/models/msg-metadata.model";
import {AccountsService} from "../../shared/services/accounts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

  private newName: string;
  private description: string;
  private image: string;

  constructor(private ballotService: BallotService,private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.ballotService.addCandidate(1, this.newName, this.description).then(id => {
      console.log(id);
      this.router.navigate(['/user/results']);
    });
  }

}
