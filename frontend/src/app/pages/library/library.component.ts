import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library.service';
import { ThemePosts } from 'src/app/models/library-model';
import { t, tInterface } from '../../utils/translate';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.sass']
})
export class LibraryComponent implements OnInit {

  active: string = t.all;
  themes: ThemePosts[] = [{name: t.all, posts: []}];
  loading: boolean = false;
  themesSubscription: Subscription;
  error: boolean = false;
  t: tInterface = t;

  constructor(
    private libraryService: LibraryService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loading = true;
    this.getThemes();
  }

  filter(theme) {
    this.router.navigateByUrl(t.url.library + '/' + t.url.theme + '/' + theme);
  }

  async getThemes(){
    this.themesSubscription = await this.libraryService.getThemes().subscribe(
      res => this.addThemes(res),
      err => this.error = true
    );
  }

  addThemes(themes){
    this.themes.push(...themes['themes']); 
    this.loading = false;
  }

  ngOnDestroy(){
    this.themesSubscription.unsubscribe();
  }
}
