import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStepItemComponent } from './manage-step-item.component';

describe('ManageStepItemComponent', () => {
  let component: ManageStepItemComponent;
  let fixture: ComponentFixture<ManageStepItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageStepItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStepItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
