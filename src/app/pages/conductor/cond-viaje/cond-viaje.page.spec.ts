import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondViajePage } from './cond-viaje.page';

describe('CondViajePage', () => {
  let component: CondViajePage;
  let fixture: ComponentFixture<CondViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CondViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
