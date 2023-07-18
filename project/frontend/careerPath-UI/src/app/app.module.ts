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
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
