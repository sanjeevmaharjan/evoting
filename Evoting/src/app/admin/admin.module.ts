import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddvoterComponent } from './addvoter/addvoter.component';
import { RouterModule } from '@angular/router';
import { routes } from './admin.routes';
import { FormsModule } from '@angular/forms';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';

@NgModule({
  declarations: [AddvoterComponent, AddCandidateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
