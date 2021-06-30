import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { t } from '../../../utils/translate';
import { phones } from 'src/app/models/forms.model';

@Component({
  selector: 'phones-repeater',
  templateUrl: './phones-repeater.component.html',
  styleUrls: ['./phones-repeater.component.sass']
})
export class PhonesRepeaterComponent implements OnInit {

  @Input() hideType: boolean = false;
  @Input() validation: boolean = true;
  @Input() label: string;

  phones: phones[] = [
    {name: 'whatsapp', label: 'WhatsApp', value: '', index: 0, disabled: false, kind: 'Whatsapp', scope: 'commercial', validation: true},
    {name: 'phone', label: this.label || t.commercial_phone, value: '', index: 1, disabled: false, kind: '', validation: true}
  ];
  currentFone: number = 1;

  labelShow: Array<string> = []
  placeholder: Array<string> = [];
  useSame: boolean = false;

  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.placeholder[1] = this.phones[1].label;
    this.placeholder[0] = this.phones[0].label;
  }

  ngOnChanges(){
    if(this.hideType && this.phones[1]){
      this.phones[1].kind = '';
    }
  }

  addPhone() {
    this.currentFone++;
    this.phones.push(
      {name: 'phone' + this.currentFone, label:  this.label || t.commercial_phone + ' ' + this.currentFone, value: '', index: this.currentFone, disabled: false, kind: '', validation: true}
      );
    this.placeholder[this.currentFone] =  this.label || t.commercial_phone + ' ' + this.currentFone;
  }

  getKind(event, index){
    this.phones[index].kind = event;
    this.validate(index);
    if(this.phones[index].value){
      this.inputChange();
    }
  }

  showLabel(index) {
    this.labelShow[index] = this.phones[index].label;
    this.placeholder[index] = '';
  }

  hideLabel(index) {
    if(!this.phones[index].value){
      this.labelShow[index] = '';
      this.placeholder[index] = this.phones[index].label;
    }
  }

  inputChange() {
    this.sendValue.emit(this.phones);
  }

  validate(index){
    if(this.phones[index].value){
      this.validateTypeAndValue(index);
    }else {
      this.phones[index].validation = true;
    }
  }

  validateTypeAndValue(index){
    this.phones[index].validation = this.phones[index].value.length > 9 && this.phones[index].value.length < 12;
    if(this.phones[index].validation && !this.hideType){
      this.phones[index].validation = !this.hideType && this.phones[index].kind? true : false;
    }
  }

  removePhone() {
    this.phones.pop();
    this.currentFone--;
    this.inputChange();
  }
}
