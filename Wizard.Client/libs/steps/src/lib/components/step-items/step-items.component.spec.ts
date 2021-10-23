import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepItemsComponent } from './step-items.component';

describe('StepItemsComponent', () => {
  let component: StepItemsComponent;
  let fixture: ComponentFixture<StepItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
