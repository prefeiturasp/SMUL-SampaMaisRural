import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { LibraryService } from 'src/app/services/library.service';
import { ThemePosts } from 'src/app/models/library-model';
import { t } from '../../utils/translate';

@Component({
  selector: 'app-library-theme',
  templateUrl: './library-theme.component.html',
  styleUrls: ['./library-theme.component.sass']
})
export class LibraryThemeComponent implements OnInit {

  private libSubscription: Subscription[] = [];
  themeName: String = '';
  themes: ThemePosts[] = [];
  items: ThemePosts[] = [];
  page: number = 1;
  allLoaded: boolean = false;
  total: number = 0;
  loading: boolean = false;
  error: boolean = false;
  
  constructor(private route: ActivatedRoute,
    private libraryService: LibraryService) { }

  ngOnInit() {
    this.getThemes();
    this.libSubscription.push(this.route.paramMap
    .subscribe((params: ParamMap) => {
      this.loadInfo(params);
    }));
  }

  loadInfo(params){
    this.themeName = params.get('theme');
    this.items = [];
    window.scroll(0,0);   
    this.loading = true;
    this.allLoaded = false;
    this.total = 0;
    this.page = 1;
    this.error = false;
    this.getItems(this.themeName);
  }

  async getThemes(){
    this.libSubscription.push(await this.libraryService.getThemes().subscribe(
      res => this.themes.push(...res['themes']),
      err => this.onError()
    ));
  }

  async getItems(theme) {
    this.libSubscription.push(await this.libraryService.getPosts(theme, this.page).subscribe(
      res => this.feedItems(res),
      err => this.onError()
    ));
  }

  onError(){
    this.loading = false;
    this.error = true;
  }

  feedItems(items){
    this.items.push(...items['posts']);
    this.total = items['total_count'];
    if(this.total === this.items.length){
      this.allLoaded = true;
    } else {
      this.page++;
    }
    this.loading = false;
  }

  ngOnDestroy() {
    for(let subs of this.libSubscription){
      subs.unsubscribe();
    }
  }
}
