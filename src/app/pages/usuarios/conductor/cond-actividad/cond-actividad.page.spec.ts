import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CondActividadPage } from './cond-actividad.page';

describe('CondActividadPage', () => {
  let component: CondActividadPage;
  let fixture: ComponentFixture<CondActividadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CondActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
