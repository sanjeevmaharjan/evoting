import { Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { VoteComponent } from './vote/vote.component';

export const userRoutes: Routes = [
    { path: 'results', component: ResultsComponent },
    { path: 'vote', component: VoteComponent}
];
