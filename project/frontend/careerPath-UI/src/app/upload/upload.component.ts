import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentService } from '../services/student/student.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  selectedFile: File | null = null;

  constructor(private http: HttpClient,
    private studentService: StudentService) {}

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
    formData.append('file', this.selectedFile);

    this.studentService.uploadFile(formData)
      .subscribe({
        next: response=> {
          console.log('File uploaded!');
        }, error: err => {
        console.log(err);
        // this.router.navigate(['/profile']);
      }
      });
  }
}
