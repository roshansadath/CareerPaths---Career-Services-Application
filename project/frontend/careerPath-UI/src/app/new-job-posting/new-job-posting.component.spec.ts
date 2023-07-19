import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobPostingComponent } from './new-job-posting.component';

describe('NewJobPostingComponent', () => {
  let component: NewJobPostingComponent;
  let fixture: ComponentFixture<NewJobPostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewJobPostingComponent]
    });
    fixture = TestBed.createComponent(NewJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
