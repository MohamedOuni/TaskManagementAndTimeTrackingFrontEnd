import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlytimesheetComponent } from './monthlytimesheet.component';

describe('MonthlytimesheetComponent', () => {
  let component: MonthlytimesheetComponent;
  let fixture: ComponentFixture<MonthlytimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlytimesheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlytimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
