import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAccordionComponent } from './item-accordion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ItemAccordionComponent', () => {
  let component: ItemAccordionComponent;
  let fixture: ComponentFixture<ItemAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAccordionComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAccordionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve atribuir uma classe ao icone', () => {
    component.icon = 'feira';
    component.ngOnInit();
    expect(component.classIcon).toBe('imgs-icon-feira')
  })

  it('ngOnChange deve fechar a sanfona que nao foi clicada', () => {
    component.closeAccordion = true;
    component.accordionStatus = 'openSanfona';
    component.ngOnChanges();
    expect(component.accordionStatus).toBe('close-accordion');
    expect(component.AccordionOpen).toBeFalsy();
    expect(component.details).toBe('+ detalhes');
  });

  it('toggleSanfona deve fechar se estiver aberta', () =>{
    component.AccordionOpen = true;
    component.toggleAccordion();
    expect(component.accordionStatus).toBe('close-accordion');
    expect(component.AccordionOpen).toBeFalsy();
    expect(component.details).toBe('+ detalhes');
  });

  it('toggleSanfona deve abrir se estiver fechada', () =>{
    component.AccordionOpen = false;
    component.toggleAccordion();
    expect(component.accordionStatus).toBe('open-accordion');
    expect(component.AccordionOpen).toBeTruthy();
    expect(component.details).toBe('Fechar');
  });
});
