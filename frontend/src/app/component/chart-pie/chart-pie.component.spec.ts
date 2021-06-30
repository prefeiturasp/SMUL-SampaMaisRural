import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPieComponent } from './chart-pie.component';
import { ChartsModule } from 'ng2-charts';

describe('ChartPieComponent', () => {
  let component: ChartPieComponent;
  let fixture: ComponentFixture<ChartPieComponent>;
  let data = {ageProfile: [{title: 'teste'}]}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPieComponent ],
      imports: [ChartsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
