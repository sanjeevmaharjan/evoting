import { Component, OnInit } from '@angular/core';
import { BallotService } from 'src/app/shared/services/ballot.service';
import { Event, Router } from '@angular/router';
import {AccountsService} from "../../shared/services/accounts.service";
import {RegistrationModel} from "../../account/register/registration.model";
import {MsgMetadataModel} from "../../shared/models/msg-metadata.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-addvoter',
  templateUrl: './addvoter.component.html',
  styleUrls: ['./addvoter.component.css']
})
export class AddvoterComponent implements OnInit {
  address: string;
  registrations: RegistrationModel[];

  constructor(private accountService: AccountsService, private ballotService: BallotService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.refresh();
  }

  verify(event, k: number) {
    event.preventDefault();
    console.log(this.registrations[k]);
    const voter = this.registrations[k];
    const msg = new MsgMetadataModel(this.ballotService.getAccount());
    this.ballotService.addVoter(voter.name, 'test', voter.address, msg).then(success => {
      console.log('Voter Added!');
      this.accountService.acceptVoter(voter.id).subscribe(() => {
        this.refresh();
        this.toastrService.success('Account Verified!');
      });
    }).catch(err => {
      this.toastrService.error(err);
    });
  }

  reject(event, k: number) {
    event.preventDefault();
    console.log(this.registrations[k]);
    const voter = this.registrations[k];

    this.accountService.rejectVoter(voter.id).subscribe(() => {
      this.refresh();
      console.log('rejected!');
      this.toastrService.info('Account rejected!');
    }, err => {
      console.error(err);
      this.toastrService.error(err);
    });
  }

  private refresh(): void {
    this.accountService.getRegistrations().subscribe(val => {
      this.registrations = val;
    });
  }

}
