import { AddvoterComponent } from "./addvoter/addvoter.component";
import {AddCandidateComponent} from "./add-candidate/add-candidate.component";

export const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'addVoter', component: AddvoterComponent },
    { path: 'addCandidate', component: AddCandidateComponent }
]
