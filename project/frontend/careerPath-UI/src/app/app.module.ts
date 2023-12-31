import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { CardComponent } from './card/card.component';
import { NewJobPostingComponent } from './new-job-posting/new-job-posting.component';
import { JobPostingDetailComponent } from './job-posting-detail/job-posting-detail.component';
import { SignupComponent } from './signup/signup.component';
import { SearchPipe } from './pipe/search.pipe';
import { UploadComponent } from './upload/upload.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { QuerySidebarComponent } from './query-sidebar/query-sidebar.component';
import { TimeAgoPipe } from './pipe/time-ago.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { SearchPipe } from './search.pipe';
// import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    DashboardComponent,
    StudentDashboardComponent,
    EmployerDashboardComponent,
    CardComponent,
    NewJobPostingComponent,
    JobPostingDetailComponent,
    SignupComponent,
    SearchPipe,
    UploadComponent,
    UserDetailComponent,
    AdminDashboardComponent,
    UserListComponent,
    JobStatusComponent,
    QuerySidebarComponent,
    TimeAgoPipe
    // SearchPipe,
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
