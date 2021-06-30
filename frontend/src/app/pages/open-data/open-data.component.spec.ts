import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ItemAccordionComponent } from '../../component/item-accordion/item-accordion.component';
import { OpenDataComponent } from './open-data.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OpenDataComponent', () => {
  let component: OpenDataComponent;
  let fixture: ComponentFixture<OpenDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDataComponent, ItemAccordionComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeAll deve fechar todas menos a terceira', () => {
    component.closeAllAccordion(2)
    expect(component.closeAccordion).toEqual([true,true,false,true,true]);
  });
});
