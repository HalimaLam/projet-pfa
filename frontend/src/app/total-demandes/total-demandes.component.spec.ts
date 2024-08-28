import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDemandesComponent } from './total-demandes.component';

describe('TotalDemandesComponent', () => {
  let component: TotalDemandesComponent;
  let fixture: ComponentFixture<TotalDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalDemandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
