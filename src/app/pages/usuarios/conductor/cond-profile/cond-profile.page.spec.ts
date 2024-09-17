import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondProfilePage } from './cond-profile.page';

describe('CondProfilePage', () => {
  let component: CondProfilePage;
  let fixture: ComponentFixture<CondProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CondProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
