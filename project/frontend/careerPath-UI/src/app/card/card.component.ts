import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() cardTitle = '';
  @Input() cardDesc = '';
  @Input() cardLocation = '';
  @Input() cardDate = '';

  @Input() id: number | undefined;
  @Output() childRejectClicked = new EventEmitter<number>();
  @Output() childInviteClicked = new EventEmitter<number>();
  @Output() childDetailClicked = new EventEmitter<number>();

  student: boolean = false;

  ngOnInit(){
    if(this.cardDesc == '' &&
      this.cardLocation == '' &&
      this.cardDate == ''){
        this.student = true;
      }
      else{
        this.student = false;
      }
  }

  rejectCandidate() {
    console.log(this.id);
    
    this.childRejectClicked.emit(this.id);
  }

  inviteForInterview(){
    this.childInviteClicked.emit(this.id);
  }

  viewDetail(){
    this.childDetailClicked.emit(this.id);
  }

}
