import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  private isOpen = new BehaviorSubject<boolean>(false);
  private width = new Subject();
  currentNavWidth = this.width.asObservable();
  currentState = this.isOpen.asObservable();

  constructor() { }

  setNavWitdh(width: number) {
    this.width.next(width);
  }

  toggle(isOpen) {
    this.isOpen.next(isOpen);
  }
}
