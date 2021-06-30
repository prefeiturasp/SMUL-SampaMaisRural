import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category.model';
import { formatFilter, capitalize } from '../../utils/tools';
import { DeviceDetectorService } from 'ngx-device-detector';
import { tforms } from 'src/app/utils/translate';

@Component({
  selector: 'all-filters',
  templateUrl: './all-filters.component.html',
  styleUrls: ['./all-filters.component.sass']
})
export class AllFiltersComponent implements OnInit {
  @Input() category: Category;
  @Input() filterQuery: string;
  @Input() isOpen: boolean = false;
  @Input() showMore: object = {};
  @Output() onChange = new EventEmitter();
  @Output() onToggleShow = new EventEmitter();
  capitalize = capitalize;
  isMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
              }

  ngOnInit() {
  }

  showOption(option, filter){
    return filter.values.indexOf(option) < 4 || this.showMore[filter.label] || this.checkIfSelected(filter.field, option) || filter.field === 'region';
  }

  filtersFor(filters) {
    return filters.filter((f) => f.field !== tforms.names.subcategory_list);
  }

  formatFilter(field, value) {
    return formatFilter(this.category.name, field, value);
  }

  onChangeUrl(query: string) {
    this.onChange.emit(query);
  }

  toggleShow(field) {
    this.onToggleShow.emit(field);
  }

  onChangeField(field: string, value:  string){
    let filters = this.filterQuery;
    if (this.filterQuery.includes(this.formatFilter(field, value))) {
      filters = filters.replace(this.formatFilter(field, value),  '')
    } else {
      filters += this.formatFilter(field, value);
    }
    this.onChangeUrl(filters);
  }

  checkIfSelected(field, option){
    return this.filterQuery.includes(this.formatFilter(field, option))
  }
}
