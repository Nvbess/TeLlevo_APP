import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCondPage } from './lista-cond.page';

describe('ListaCondPage', () => {
  let component: ListaCondPage;
  let fixture: ComponentFixture<ListaCondPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCondPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
