import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewJobPostingComponent } from './new-job-posting/new-job-posting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostingDetailComponent } from './job-posting-detail/job-posting-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/posting', component: JobPostingDetailComponent },
  { path: 'dashboard/posting/new', component: NewJobPostingComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'user/detail', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
