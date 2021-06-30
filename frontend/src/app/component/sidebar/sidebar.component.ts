import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { sidebar } from 'src/app/models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})

export class SidebarComponent implements OnInit {
  sidebarItems: sidebar[] = [];
  hoverIcon = [];
  isMobile: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private deviceService: DeviceDetectorService) {
    this.route.data.subscribe((data: any) => {
      router.config
      .filter((item: any) => item.data.sidenav || item.data.sidenavTitle)
      .map((item: any) => this.sidebarItems
        .push({ label: (item.data.sidenavTitle || item.data.label),
          path: item.path,
          icon: `${this.getIcon(item, data.category)}`,
          iconHover: this.getHoverIcon(item),
          preloadItems:  [this.getHoverIcon(item), item.data.icon, item.data.activeIcon]
        })
      );
  }).unsubscribe();
  }

  getIcon(item: any, category: string) {
    if (item.data.category != category) {
      return item.data.icon
    }
    return item.data.activeIcon;
  }
  ngOnInit() {
    this.isMobile = this.deviceService.isMobile();
  }

  goToCategory(path){
    this.router.navigate([path], {queryParams: {covid: null}});
  }

  getHoverIcon(item){
    return `hover-${item.data.category ? item.data.category: 'all'}`;
  }
}
