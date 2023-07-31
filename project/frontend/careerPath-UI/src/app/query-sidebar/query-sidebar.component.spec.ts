import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerySidebarComponent } from './query-sidebar.component';

describe('QuerySidebarComponent', () => {
  let component: QuerySidebarComponent;
  let fixture: ComponentFixture<QuerySidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuerySidebarComponent]
    });
    fixture = TestBed.createComponent(QuerySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
