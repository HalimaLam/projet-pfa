import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesUserComponent } from './demandes-user.component';

describe('DemandesUserComponent', () => {
  let component: DemandesUserComponent;
  let fixture: ComponentFixture<DemandesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
