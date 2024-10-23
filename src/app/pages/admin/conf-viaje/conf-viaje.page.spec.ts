import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfViajePage } from './conf-viaje.page';

describe('ConfViajePage', () => {
  let component: ConfViajePage;
  let fixture: ComponentFixture<ConfViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
