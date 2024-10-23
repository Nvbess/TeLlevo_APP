import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondEditprofilePage } from './cond-editprofile.page';

describe('CondEditprofilePage', () => {
  let component: CondEditprofilePage;
  let fixture: ComponentFixture<CondEditprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CondEditprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
