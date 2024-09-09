import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PjQrPage } from './pj-qr.page';

describe('PjQrPage', () => {
  let component: PjQrPage;
  let fixture: ComponentFixture<PjQrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PjQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
