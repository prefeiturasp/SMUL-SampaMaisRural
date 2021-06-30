import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomLinksComponent } from './bottom-links.component';

describe('BottomLinksComponent', () => {
  let component: BottomLinksComponent;
  let fixture: ComponentFixture<BottomLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
