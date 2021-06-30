import { Component, OnInit, Input } from '@angular/core';
import { counterInfo } from '../../models/category.model';
import { Router } from '@angular/router';
import { formatFilter, formatFilters } from '../../utils/tools';
import { translateCat, t } from '../../utils/translate';

@Component({
  selector: 'category-counter',
  templateUrl: './category-counter.component.html',
  styleUrls: ['./category-counter.component.sass']
})
export class CategoryCounterComponent implements OnInit {
  @Input() data: counterInfo;
  @Input() page: string;
  @Input() imgSizeW: number = 86;
  @Input() imgSizeH: number = 86;
  @Input() percentage: boolean = false;
  @Input() ballonFull: boolean = false;
  @Input() textBellow: boolean = false;
  marginImgTop: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    if(this.imgSizeH !== 86) {
      this.marginImgTop = 8;
    }
  }

  sendToMap(){
    let filters = null;
    const category = (translateCat(this.data.link) || this.data.category).toLowerCase();
    if (this.data.filters) {
      filters = formatFilters(category, this.data.filters)
    } else {
      filters = formatFilter(category, this.data.field, this.data.apiFieldValue ||this.data.title)
    }
    this.router.navigate([this.data.link], { queryParams: {
      filters: filters, covid: this.page === t.url.corona || this.data.covid? true : null
    }});
  }
}
