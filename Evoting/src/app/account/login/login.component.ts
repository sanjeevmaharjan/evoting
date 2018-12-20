import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../../shared/services/accounts.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {BallotService} from "../../shared/services/ballot.service";

declare let window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  address: string;
  password: string;

  constructor(private accountService: AccountsService,
              private toastrService: ToastrService,
              private router: Router,
              private ballotService: BallotService) {}

  ngOnInit() {
  }

  public submit(event): void {
    console.log('submit button clicked ');
    this.accountService.unlock(this.address, this.password).then(success => {
      if (success) {
        this.toastrService.success('Logged in as Account: ' + this.address);
        this.ballotService.isAccountAdmin(this.address).then(isAdmin => {
          this.ballotService.isAdmin = isAdmin;
        });
        this.router.navigate(['/user/results']);
      } else {
        event.preventDefault();
      }
    }).catch(err => {
      this.toastrService.error(err)
      event.preventDefault();
    });
  }
}
