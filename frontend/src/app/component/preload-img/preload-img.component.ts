import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'preload-img',
  templateUrl: './preload-img.component.html',
  styleUrls: ['./preload-img.component.sass']
})
export class PreloadImgComponent implements OnInit {
  @Input() extension: string = 'svg';
  @Input() imgs: Array<string>;
  @Input() path: string = '/assets/svgs/';

  constructor() { }

  ngOnInit() {
  }

}
