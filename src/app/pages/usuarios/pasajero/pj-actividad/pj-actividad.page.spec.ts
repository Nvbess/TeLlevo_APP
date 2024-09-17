import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PjActividadPage } from './pj-actividad.page';

describe('PjActividadPage', () => {
  let component: PjActividadPage;
  let fixture: ComponentFixture<PjActividadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PjActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
