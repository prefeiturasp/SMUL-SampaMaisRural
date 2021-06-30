import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionCardsComponent } from './connection-card.component';

describe('ConnectionCardsComponent', () => {
  let component: ConnectionCardsComponent;
  let fixture: ComponentFixture<ConnectionCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
