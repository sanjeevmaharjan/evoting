import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VoteComponent } from './user/vote/vote.component';
import { ResultsComponent } from './user/results/results.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'vote', component: VoteComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'register', component: RegisterComponent }
];
