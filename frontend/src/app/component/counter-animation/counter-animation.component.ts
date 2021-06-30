import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'counter',
  templateUrl: './counter-animation.component.html',
  styleUrls: ['./counter-animation.component.sass']
})
export class CounterAnimationComponent implements OnInit {
  @Input() counter: number;
  @Input() fontStyle: String = 'normal';
  @Input() percentage: boolean = false;

  countShow: number = 0;

  constructor() { }

  ngOnInit() {
    this.counterAnimation(); 
  }

  ngOnChanges() {
    this.counterAnimation();
  }

  counterAnimation () {
    let counter = 0;
    counter = this.counter;
    if(counter > 0){
      let current = 0;
      let increment = counter < 200? 1 : 5;
      let stepTime = 0;
      this.count(current, increment, counter, stepTime)
    }
  }

  count(current, increment, counter, stepTime){
    let comp = this;
    let timer = setInterval(function() {
      current += increment;
      comp.countShow = current;
      if(current > counter){
        comp.countShow = counter;
        clearInterval(timer);
      }
  }, stepTime);
  }
}
