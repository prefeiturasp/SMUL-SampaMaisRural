import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'total-results',
  templateUrl: './total-results.component.html',
  styleUrls: ['./total-results.component.sass']
})
export class TotalResultsComponent implements OnInit {

  @Input() onMap: boolean = false;
  @Input() totalCount: number = null;
  termSubscription: Subscription;
  isTop: boolean = false;

  term: string;

  constructor(
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.isTop = !this.route.snapshot.data.category

    this.termSubscription = this.route.queryParams.subscribe(params => {
      this.term = params.term;
    });
  }

  ngOnDestroy(){
    this.termSubscription.unsubscribe();
  }

}
