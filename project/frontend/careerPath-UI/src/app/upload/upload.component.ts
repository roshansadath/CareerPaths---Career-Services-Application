import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student/student.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  selectedFile: File | null = null;

  constructor(private http: HttpClient,
    private studentService: StudentService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileUpload(event: Event) {
    event.preventDefault();

    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('cvFile', this.selectedFile);

    this.studentService.uploadFile(formData)
      .subscribe({
        next: response=> {
          this.snackBar.open('Resume Uploaded!', 'Dismiss', {
            duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
          });
          this.router.navigate(['/dashboard']);
        }, error: err => {
        console.log(err);
        this.snackBar.open(err, 'Dismiss', {
          duration: 2000, // Set the duration (in milliseconds) for how long the snackbar will be displayed
        });
        // this.router.navigate(['/profile']);
      }
      });
  }
}
