import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateModelComponent } from './simulate-model.component';

describe('SimulateModelComponent', () => {
  let component: SimulateModelComponent;
  let fixture: ComponentFixture<SimulateModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulateModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulateModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
