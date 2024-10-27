import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PjAceptarviajePage } from './pj-aceptarviaje.page';

describe('PjAceptarviajePage', () => {
  let component: PjAceptarviajePage;
  let fixture: ComponentFixture<PjAceptarviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PjAceptarviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
