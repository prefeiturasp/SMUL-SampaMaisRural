import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'library-item',
  templateUrl: './library-item.component.html',
  styleUrls: ['./library-item.component.sass']
})
export class LibraryItemComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
  }

  goToUrl(event, url){
    event.stopPropagation();
    if(url){
      window.open(url,'_blank');
    }
  }

}
