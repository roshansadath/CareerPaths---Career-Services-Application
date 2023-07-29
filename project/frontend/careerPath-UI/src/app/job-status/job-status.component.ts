import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css']
})
export class JobStatusComponent {
  @Input() data: any | undefined;
  @Output() childCloseClicked = new EventEmitter<number>();
  ngOnInit(){
    this.generateModalData(this.data);
  }
  generateModalData(data: any){
    console.log(data);
  }

  closeDialog(){
    this.childCloseClicked.emit();
  }

}
