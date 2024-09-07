import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetViajesPage } from './det-viajes.page';

describe('DetViajesPage', () => {
  let component: DetViajesPage;
  let fixture: ComponentFixture<DetViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
