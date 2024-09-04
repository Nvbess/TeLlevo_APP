import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PjProfilePage } from './pj-profile.page';

describe('PjProfilePage', () => {
  let component: PjProfilePage;
  let fixture: ComponentFixture<PjProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PjProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
