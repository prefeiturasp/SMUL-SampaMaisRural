import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryThemeComponent } from './library-theme.component';

describe('LibraryThemeComponent', () => {
  let component: LibraryThemeComponent;
  let fixture: ComponentFixture<LibraryThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
