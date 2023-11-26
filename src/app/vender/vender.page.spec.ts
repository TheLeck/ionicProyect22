import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenderPage } from './vender.page';

describe('VenderPage', () => {
  let component: VenderPage;
  let fixture: ComponentFixture<VenderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
