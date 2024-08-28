import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDemandeComponent } from './layout-demande.component';

describe('LayoutDemandeComponent', () => {
  let component: LayoutDemandeComponent;
  let fixture: ComponentFixture<LayoutDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutDemandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
