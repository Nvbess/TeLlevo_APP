import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PjEditprofilePage } from './pj-editprofile.page';

describe('PjEditprofilePage', () => {
  let component: PjEditprofilePage;
  let fixture: ComponentFixture<PjEditprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PjEditprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
