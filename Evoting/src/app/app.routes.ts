import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { VoteComponent } from './user/vote/vote.component';
import { ResultsComponent } from './user/results/results.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule'}
];
