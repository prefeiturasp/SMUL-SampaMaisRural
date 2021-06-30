import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { chart } from 'src/app/models/category.model';

@Component({
  selector: 'chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.sass']
})
export class ChartPieComponent implements OnInit {

  @Input() data: chart;
  @Input() size: number;

  isFour: boolean = false;
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    }
  };
  pieChartLabels: Label[];
  pieChartData: number[];
  pieChartType: ChartType = 'pie';
  pieChartLegend: boolean = false;
  pieChartColors = [{backgroundColor: ['#3F993F', '#F0A854', '#292F36']}];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.data.chartData.length > 3){
      this.isFour = true;
      this.pieChartColors[0].backgroundColor.push('#E1E1E1');
    } else {
      this.pieChartColors[0].backgroundColor.slice(3,1);
    }
    
    this.constructChart();
  }


  constructChart(){
    let pieData = [];
    let pieLabels = []
    let data = this.data.chartData;
    for (let item = 0; item < data.length; item++) {
      pieData.push(data[item].percentage);
      pieLabels.push(data[item].title);
    }
    this.pieChartData = pieData;
    this.pieChartLabels = pieLabels;
  }
}
