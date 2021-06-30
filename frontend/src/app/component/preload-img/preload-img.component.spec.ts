import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadImgComponent } from './preload-img.component';

describe('PreloadImgComponent', () => {
  let component: PreloadImgComponent;
  let fixture: ComponentFixture<PreloadImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
