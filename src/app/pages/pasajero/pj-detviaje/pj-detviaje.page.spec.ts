import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PjDetviajePage } from './pj-detviaje.page';

describe('PjDetviajePage', () => {
  let component: PjDetviajePage;
  let fixture: ComponentFixture<PjDetviajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PjDetviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
