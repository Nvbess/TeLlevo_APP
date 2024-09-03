import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmUsuariosPage } from './adm-usuarios.page';

describe('AdmUsuariosPage', () => {
  let component: AdmUsuariosPage;
  let fixture: ComponentFixture<AdmUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
