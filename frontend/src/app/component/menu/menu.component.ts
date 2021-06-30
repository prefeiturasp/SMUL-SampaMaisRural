import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})

export class MenuComponent implements OnInit {
  menuItems = [];
  whiteColorClass: string = 'white-color';

  @Input() colorMenu: string = '';

  constructor(private router: Router) {
    router.config
    .filter((item: any) => !!item.data.label && !item.data.sidenav)
    .map((item: any) => this.menuItems.push({ label: item.data.label, path: item.path, subItems: item.data.subItems}));
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.whiteColorClass = this.colorMenu + '-color';
  }
}
