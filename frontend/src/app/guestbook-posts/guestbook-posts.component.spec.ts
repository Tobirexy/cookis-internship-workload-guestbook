import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestbookPostsComponent } from './guestbook-posts.component';

describe('GuestbookEntriesComponent', () => {
  let component: GuestbookPostsComponent;
  let fixture: ComponentFixture<GuestbookPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestbookPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestbookPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
