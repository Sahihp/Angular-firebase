import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsformComponent } from './commentsform.component';

describe('CommentsformComponent', () => {
  let component: CommentsformComponent;
  let fixture: ComponentFixture<CommentsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
