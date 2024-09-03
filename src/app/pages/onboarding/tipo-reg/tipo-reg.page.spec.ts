import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoRegPage } from './tipo-reg.page';

describe('TipoRegPage', () => {
  let component: TipoRegPage;
  let fixture: ComponentFixture<TipoRegPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
