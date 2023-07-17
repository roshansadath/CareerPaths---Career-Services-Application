import { Component, Input } from '@angular/core';

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

}
