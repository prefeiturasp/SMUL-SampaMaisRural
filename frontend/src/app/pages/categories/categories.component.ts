import { Component, OnInit } from '@angular/core';
import { API_URL } from '../../utils/constants';
import { CategoriesService } from 'src/app/services/categories.service';
import { t, translateCat, tInterface, getTitle, tforms } from '../../utils/translate';
import { counterInfo, connections } from 'src/app/models/category.model';
import { feedCounters, descCategories } from './category-items'
import { Router } from '@angular/router';
import { routeToSlug, formatFilter } from 'src/app/utils/tools';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  title: string;
  page: string;
  pageClass: string;
  count: Number = 0;
  catApi: string = '';
  data = null;
  counters: counterInfo[] = []
  urlJson: string =  '';
  connectionsData: connections = null;
  t: tInterface = t;
  farmerTitle: string = t.farmers.toLowerCase();
  desc = descCategories;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.page = window.location.pathname.split('/'+ t.category +'/')[1];
    this.pageClass = (translateCat(this.page) || this.page).toLowerCase();
    let pageName = this.page.replace(/^\w/, c => c.toUpperCase());
    this.title = this.defineTitle(pageName);
    this.catApi = this.getPageName(pageName);
    this.getUrlJson();
    this.getCounters();
  }

  defineTitle(name: string){
    return getTitle(name);
  }

  openMap(){
    let coronaPage: boolean = this.page === t.url.corona;
    let link = coronaPage? t.url.explore : this.page;
    this.navigate(coronaPage, link, null, null, null);
  }

  navigate(corona, link, filter, content, category){
    this.router.navigate(['/' + link], {queryParams: {
      covid: corona? true : null,
      filters: category? formatFilter(category, filter, content): null
    }});
  }

  openConnectionMap(){
    routeToSlug(this, ('/explorar'), { connection: true });
  }

  donationsOnMap(){
    this.navigate(true, '/explorar', tforms.names.subcategory_list, 'SP Cidade Solidária', 'initiative')
  }

  getUrlJson(){
    this.urlJson = API_URL + '/report/';
    let dataLink = this.catApi;
    switch(this.catApi){
      case 'market':
        dataLink = 'idec';
        break;
      case 'initiative':
        dataLink = 'sprural';
        break;
    }
    this.urlJson += dataLink;
  }

  getPageName(name: string){
    return (translateCat(name)? translateCat(name) : name).toLowerCase();
  }

  async getCounters() {
    this.data = await this.categoriesService.getCategoryInfo(this.catApi).toPromise();
    if(this.data){
      this.count = this.data['all'] || this.data['count'];
      if(this.catApi !== t.categoryName.upa.toLowerCase()){
        this.counters = feedCounters(this.page, this.data);
      }
      this.feedConnections();
    }
  }

  feedConnections(){
    this.connectionsData = {
      main: this.catApi,
      data:[]
    };

    let categories = Object.keys(t.categoryName);
    for(let category of categories){
      let categoryName = t.categoryName[category].toLowerCase();
      if(categoryName !== this.catApi){
        this.connectionsData.data.push({name: categoryName, value: this.data['related_with_' + categoryName]});
      }
    }
  }
}
