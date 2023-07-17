import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewJobPostingComponent } from './new-job-posting/new-job-posting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostingDetailComponent } from './job-posting-detail/job-posting-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: JobPostingDetailComponent },
  { path: 'posting/new', component: NewJobPostingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
