import { AddvoterComponent } from "./addvoter/addvoter.component";

export const routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'addVoter', component: AddvoterComponent }
]