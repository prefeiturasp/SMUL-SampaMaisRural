import { t } from './translate';
import { CategoryNames } from '../models/category.model';
import * as L from 'leaflet';

export enum Categories {
  All = '',
  Farmers = 'upa',
  Markets = 'market',
  Tourism = 'tourism',
  Initiatives = 'initiative'
}

export const categoriesList: CategoryNames[] = [
  {name: t.farmers, title: t.upa},
  {name: t.fairs, title: t.markets},
  {name: t.touristic_point, title: t.tourism},
  {name: t.initiatives, title: t.initiatives}
];

export function capitalize(name) {
  let nameArray = name.toLowerCase().split(' ');
  let formatedName = '';
  for(let subName of nameArray){
    let subNameCapitalized = subName;
    subNameCapitalized = subNameCapitalized.charAt(0).toUpperCase() + subNameCapitalized.slice(1);
    formatedName += subNameCapitalized + ' ';
  }
  return formatedName;
}

export function formatPhone(value) {
    let phone = value.trim();
    if(phone) {
      if(phone.length === 10) {
        phone =  `(${phone[0]}${phone[1]}) ${phone[2]}${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`
      } else if(phone.length === 11) {
        phone =  `(${phone[0]}${phone[1]}) ${phone[2]}${phone[3]}${phone[4]}${phone[5]}${phone[6]}-${phone[7]}${phone[8]}${phone[9]}${phone[10]}`
      }
      return phone;
    }
}

export function removeSameObj(arr, cat) {
  return arr.filter(e => e.category !== cat);
}

export function formatFilters(category, filters) {
  let filtersQuery = '';
  filters.map((filter) => filtersQuery += formatFilter(category, filter.field, filter.value));
  return filtersQuery;
}

export function formatFilter(category, field, value) {
  return 'filters[' + category + ']' + '[' + field + '][]=' + value + '&';
}

export function formatSchedule(schedule){
  if(schedule.includes('<br />')) {
    return schedule.split('<br />');
  } else {
    return [schedule];
  }
}

export function zoomControl(isMobile){
  const position = isMobile ?  'topright' : 'bottomright';
  return L.control.zoom({ position: position });
}

export function formatValues(values){
  let formated = [];
  for (let c = 0; c < values.length; c++) {
    formated.push({id: c, title: values[c]});
  }
  return formated;
}

export function validateEmail(input){
  return /\S+@\S+\.\S+/.test(input);
}


export function getReferencePoint(coordsA, coordsB){
  let cX;
  let cY;

  const downCurve = true;
  const angle = toRadians(30);

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const latA = coordsA[0];
  const lonA = coordsA[1];

  const latB = coordsB[0];
  const lonB = coordsB[1];

  const midPoint = 15; // controls the curve
  const trianguleHeight = 10;

  const vectorX = (latB - latA) / midPoint;
  const vectorY = (lonB - lonA) / midPoint;

  let vectorCX, vectorCY;

  if (downCurve) {
    vectorCX = vectorX * cos - vectorY * sin;
  } else {
    vectorCX = vectorX * cos + vectorY * sin;
  }

  vectorCY = vectorX * cos + vectorY * sin;

  cX = latA + trianguleHeight * vectorCX;
  cY = lonA + trianguleHeight * vectorCY;

  return [cX, cY];
}

export function toRadians (angle) {
    return angle * (Math.PI / 180);
}

export function routeToSlug(component, url, params){
  component.router.navigate([url], {queryParams: params});
}

export function removeDuplicate(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}
