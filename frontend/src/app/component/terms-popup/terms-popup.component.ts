import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-popup',
  templateUrl: './terms-popup.component.html',
  styleUrls: ['./terms-popup.component.sass']
})
export class TermsPopupComponent implements OnInit {
  hide = true;

  constructor() { }

  ngOnInit() {
    this.hide = localStorage.getItem('@terms') === 'accepted';
  }

  onAccept() {
    localStorage.setItem('@terms', 'accepted');
    this.hide = true;
  }

}
