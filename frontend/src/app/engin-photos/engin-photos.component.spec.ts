import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginPhotosComponent } from './engin-photos.component';

describe('EnginPhotosComponent', () => {
  let component: EnginPhotosComponent;
  let fixture: ComponentFixture<EnginPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnginPhotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnginPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
