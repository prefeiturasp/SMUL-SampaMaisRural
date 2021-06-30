import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { t, tforms } from '../../../utils/translate';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.sass']
})

export class InputFormComponent implements OnInit {

  @Input() category: string;
  @Input() noPadding: boolean;
  @Input() type: string;
  @Input() values: Array<string>;
  @Input() subtype: string;
  @Input() name: string;
  @Input() label: string;
  @Input() title: string;
  @Input() selectField: object;
  @Input() rows: number;
  @Input() mask: string;
  @Input() noPreview: boolean;
  @Input() hideType: boolean;
  @Input() textField: object;
  @Input() yesNo: boolean;
  @Input() contactInfo;
  @Input() retract: boolean;
  @Input() subtitle: string;
  @Input() otherField;
  @Input() legend: string;
  @Input() setValue: string;
  @Input() address: string;
  @Input() validation: boolean = true;
  @Input() currentForm: string;

  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  placeholder: string = '';
  labelShow: string= '';
  valueInput: string = '';
  disabled: boolean = false;
  adress: string;
  showRetracted: boolean = false;

  constructor() { }

  ngOnInit() {
    this.placeholder = this.label;
    if (this.currentForm == this.title) {
      this.toggleRetracted();
    }
  }

  showLabel() {
    this.labelShow = this.label;
    this.placeholder = '';
  }

  toggleRetracted(){
    if(this.retract){
      this.showRetracted = !this.showRetracted;
    }
  }

  ngOnChanges() {
    this.disabled = false;
    this.verifyContactInfo();
    if(this.setValue == '' || this.setValue){
      this.valueInput = this.setValue;
    }
  }

  verifyContactInfo(){
    if(this.label === tforms.titles.registration_email && this.contactInfo && this.contactInfo.email) {
      this.valueInput = this.contactInfo.email;
      this.disabled = true;
      this.sendValue.emit({value: this.valueInput, name: this.name});
    }
    if(this.label === tforms.titles.personal_phone && this.contactInfo && this.contactInfo.phone && this.contactInfo.phone.value) {
      this.valueInput = this.contactInfo.phone.value;
      this.disabled = true;
      this.sendValue.emit({value: this.valueInput, name: this.name});
    }
  }

  hideLabel() {
    if(!this.valueInput){
      this.labelShow = '';
      this.placeholder = this.label;
    }
  }

  getValue(event) {
    let sendData = null;
    if(event && event.textfield) {
      sendData = [
        {value: event.radio, name: this.name},
        {value:event.textfield.value, name: event.textfield.name}];
    } else {
      sendData = {value: event, name: this.name};
    }
    this.sendValue.emit(sendData);
  }

  sendAddress(){
    if(this.label === tforms.titles.address) {
      this.sendValue.emit({value: this.valueInput, name: this.name});
    }
  }

  inputChange() {
    this.sendValue.emit({value: this.valueInput, name: this.name});
  }
}

