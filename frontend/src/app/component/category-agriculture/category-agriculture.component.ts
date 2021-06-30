import { Component, OnInit, Input } from '@angular/core';
import { t } from '../../utils/translate';
import { chart } from 'src/app/models/category.model';
import { feedCharts, getAgricultureItems} from './agriculture-items';

@Component({
  selector: 'category-agriculture',
  templateUrl: './category-agriculture.component.html',
  styleUrls: ['./category-agriculture.component.sass']
})
export class CategoryAgricultureComponent implements OnInit {

  @Input() upaData;

  page: string = t.farmers;
  data = null;
  chartAgeProfile: chart = null;
  cutivatedArea: chart = null;

  buildData(info) {
    this.data = getAgricultureItems(info);
    let charts = feedCharts(info);

    this.chartAgeProfile = charts.chartAgeProfile;
    this.cutivatedArea = charts.cutivatedArea;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.upaData){
      this.buildData(this.upaData);
    }
  }

}
