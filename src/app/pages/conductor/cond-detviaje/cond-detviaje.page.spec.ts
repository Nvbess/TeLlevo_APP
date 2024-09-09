import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondDetviajePage } from './cond-detviaje.page';

describe('CondDetviajePage', () => {
  let component: CondDetviajePage;
  let fixture: ComponentFixture<CondDetviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CondDetviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
