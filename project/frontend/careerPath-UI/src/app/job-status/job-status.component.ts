import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css']
})
export class JobStatusComponent {
  // Input property to receive data from parent component
  @Input() data: any | undefined;

  // Output property to emit an event to parent component
  @Output() childCloseClicked = new EventEmitter<number>();

  ngOnInit() {
    // Component initialization logic
    this.generateModalData(this.data);
  }

  // Generate modal data based on the received input data
  generateModalData(data: any) {
    console.log(data);
    // Perform operations based on the received data
  }

  // Function to emit event when close button is clicked
  closeDialog() {
    this.childCloseClicked.emit();
    // Emit the event to notify the parent component
  }
}
