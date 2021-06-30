import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { t } from '../../utils/translate';
import { Report } from '../../models/report.model';

@Component({
  selector: 'item-accordion',
  templateUrl: './item-accordion.component.html',
  styleUrls: ['./item-accordion.component.sass']
})
export class ItemAccordionComponent implements OnInit {

  @Input() report: Report;
  @Input() isOpen: boolean = false;
  @Input() idAccordion: number;
  @Output() closeAllAccordions = new EventEmitter();

  AccordionOpen: boolean = false;
  classIcon: string = '';
  accordionStatus: string = 'closed-accordion';
  details: string = '+ ' + t.details;

  constructor() { }

  ngOnInit() {
    this.classIcon = 'imgs-icon-' + this.report.icon;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isOpen && changes.isOpen.previousValue) {
      this.details = '+ ' + t.details;
    }
  }

  toggleAccordion() {
    if(this.isOpen) {
      this.details = '+ ' + t.details;
    } else {
      this.details = t.close;
    }
    this.closeAllAccordions.emit(this.idAccordion);
  }
}
