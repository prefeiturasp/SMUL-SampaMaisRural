import { Place } from './place.model';
import { Filter } from './filter.model';

export class Category {
  name: string;
  label?: string;
  places?: Array<Place>;
  filters?: Array<Filter>;
  filter_selected?: boolean = false;
  count?: number = 0;
}

export interface CategoryNames {
  name: string;
  title: string;
}

export interface counterInfo {
  count: number;
  desc: string;
  externalLink: string;
  img: string;
  link: string;
  category: string;
  title: string;
  covid?: boolean;
  field?: string;
  apiFieldValue?: any;
  percentage?: number;
  filters: any; // TODO use interface
  info?: infoModel[]
};

export interface infoModel {
  title: string;
  data: number;
};

export interface chart {
  title: string;
  desc: string;
  chartData: chartData[]
};

export interface connections {
  data: connectionsData[];
  main: string;
};

export interface connectionsData {
  name: string;
  value: number;
};

export interface chartData {
  percentage: number;
  title: string;
};
