import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModUsuariosPage } from './mod-usuarios.page';

describe('ModUsuariosPage', () => {
  let component: ModUsuariosPage;
  let fixture: ComponentFixture<ModUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
