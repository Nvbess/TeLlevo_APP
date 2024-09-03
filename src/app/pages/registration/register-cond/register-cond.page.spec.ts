import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCondPage } from './register-cond.page';

describe('RegisterCondPage', () => {
  let component: RegisterCondPage;
  let fixture: ComponentFixture<RegisterCondPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
