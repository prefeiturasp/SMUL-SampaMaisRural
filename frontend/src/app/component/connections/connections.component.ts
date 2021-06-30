import { Component, OnInit, Input } from '@angular/core';
import { t, tInterface } from '../../utils/translate';
import { connections } from 'src/app/models/category.model';

@Component({
  selector: 'connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.sass']
})
export class ConnectionsComponent implements OnInit {

  @Input() connectionsData: connections;
  leftNumberClass: string = '';
  middleNumberClass: string = '';
  rightNumberClass: string = '';
  t: tInterface = t;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if(this.connectionsData){
      this.leftNumberClass = this.getSize(this.connectionsData.data[0].value);
      this.middleNumberClass = this.getSize(this.connectionsData.data[1].value);
      this.rightNumberClass = this.getSize(this.connectionsData.data[2].value);
    }
  }

  getSize(value){
    return value < 100? this.extraOrSmall(value) : this.mediumOrBig(value);
  }

  mediumOrBig(value){
    return (value < 1000? 'medium-size' : 'big-size');
  }

  extraSmall(value){
    return (value === 0? 'zero' : 'extra-small-size');
  }

  extraOrSmall(value){
    return (value < 10? this.extraSmall(value) : 'small-size');
  }
}
