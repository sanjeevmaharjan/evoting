import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent}
];
