import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleEnginsComponent } from './controle-engins.component';

describe('ControleEnginsComponent', () => {
  let component: ControleEnginsComponent;
  let fixture: ComponentFixture<ControleEnginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControleEnginsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleEnginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
