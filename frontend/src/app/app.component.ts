import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { Icons, IconsPath, IconsExt } from './utils/icons';
import { RouterOutlet, Router, NavigationEnd, ActivationStart } from '@angular/router';
import { analyticsID } from './utils/constants';

declare var gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  host: {'(document:keypress)': 'handleKeyboardEvent($event)'}
})

export class AppComponent {

  title: string = 'sp-rural-interface';
  pageName: string = '';
  isGray: boolean = false;
  hasMap: boolean = false;
  hasFooter: boolean = true;

  constructor(private matIconRegistry: MatIconRegistry,
              private router: Router,
              sanitizer: DomSanitizer) {
                this.registerIcons(sanitizer);
              }

  ngOnInit() {
    this.navContext();
    gtag('config', analyticsID);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'Enter'){
      let element: HTMLElement = document.activeElement as HTMLElement;
      element.click();
    }
  }

  registerIcons(sanitizer: DomSanitizer): void {
    Icons.map((name) => {
      let icon = IconsPath + name + IconsExt;
      this.matIconRegistry
      .addSvgIcon(name,
                  sanitizer
                  .bypassSecurityTrustResourceUrl(icon));
    })
  }

  navContext() {
    this.router.events.subscribe(event=>{
      if(event instanceof ActivationStart){
        let data = event.snapshot.data;
        this.pageName = data.name.toLowerCase();
        this.hasFooter = data.footer;
        this.hasMap = data.map;
        this.isGray = data.isGray;
      }
      this.googleAnalytics(event);
    });
  }

  getProperty(outlet: RouterOutlet, property: string) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData[property]
  }

  googleAnalytics(event){
    if(event instanceof NavigationEnd){
      gtag('config', analyticsID, {'page_path': event.urlAfterRedirects });
    }
  }
}
