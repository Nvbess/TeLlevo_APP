import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPasPage } from './lista-pas.page';

describe('ListaPasPage', () => {
  let component: ListaPasPage;
  let fixture: ComponentFixture<ListaPasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
