import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetUsuariosPage } from './det-usuarios.page';

describe('DetUsuariosPage', () => {
  let component: DetUsuariosPage;
  let fixture: ComponentFixture<DetUsuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
