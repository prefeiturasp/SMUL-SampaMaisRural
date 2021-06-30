import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usage-terms',
  templateUrl: './usage-terms.component.html',
  styleUrls: ['./usage-terms.component.sass']
})
export class UsageTermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scroll(0,0);
  }

  scroll(el){
    el.scrollIntoView({behavior: 'smooth'});
  }

}
