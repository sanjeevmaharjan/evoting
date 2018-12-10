import { Component, OnInit } from '@angular/core';
import {BallotService} from "../../shared/services/ballot.service";
import {MsgMetadataModel} from "../../shared/models/msg-metadata.model";

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit {

  private newName: string;
  private description: string;
  private image: string;

  constructor(private ballotService: BallotService) { }

  ngOnInit() {
  }

  submit() {
    console.log(this.newName);
    this.ballotService.addCandidate(1, this.newName, this.description, new MsgMetadataModel(this.ballotService.getAccount())).then(id => {
      console.log(id)
    });
  }

}
