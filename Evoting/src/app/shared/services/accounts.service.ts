import { Injectable, Inject } from '@angular/core';
import {EthService} from "./eth.service";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegistrationModel} from "../../account/register/registration.model";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {TransactionModel} from "../models/transaction.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private web3;

  constructor(private ethService: EthService, private http: HttpClient) {

    this.web3 = this.ethService.getWeb3();

    // set default account
    this.getAccountInfo().then(account => this.web3.eth.defaultAccount = account);
  }

  public getAccountInfo(): Promise<string|null> {
    return new Promise((resolve, reject) => {
      this.web3.eth.getCoinbase().then(account => {
        return resolve(account);
      });
    });
  }

  public unlock(address: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.web3.eth.personal.unlockAccount(address, password, 6000).then(success => {
        if (success) {
          console.log('Account: ' + address + ' Unlocked.');
          this.web3.eth.defaultAccount = address;
          return resolve(true);
        }
        else {
          return reject('Could not Unlock Account');
        }
      }).catch(err => {
        return reject(err);
      });
    });
  }

  public transferEther(address: string): Promise<boolean> {
    const transaction = new TransactionModel();
    transaction.from = this.web3.eth.defaultAccount;
    transaction.to = address;
    transaction.value = this.web3.utils.toWei('10', 'ether');
    return new Promise<boolean>((resolve, reject) => {
      this.web3.eth.sendTransaction(transaction).then(receipt => {
        console.log(receipt);
        return resolve (true);
      });
    });
  }

  /** Create a new account */
  public createAccount(password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.web3.eth.personal.newAccount(password).then( account => {
        return resolve(account);
      });
    });
  }

  public registerVoter(registration: RegistrationModel): Observable<any> {
    return this.http.post<RegistrationModel>('http://localhost:3000/register', registration, httpOptions);
  }

  public rejectVoter(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/delete/' + id);
  }

  public acceptVoter(id: number): Observable<any> {
    return this.http.get('http://localhost:3000/verify/' + id);
  }

  public getRegistrations(): Observable<RegistrationModel[]> {
    return this.http.get<RegistrationModel[]>('http://localhost:3000/register');
  }
}
