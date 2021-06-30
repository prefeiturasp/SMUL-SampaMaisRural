import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { radioButtons, selectField, textField } from 'src/app/models/forms.model';
import { formatValues } from '../../../utils/tools';

@Component({
  selector: 'radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.sass']
})

export class RadioInputComponent implements OnInit {

  @Input() title: string;
  @Input() radioButtons: Array<string>;
  @Input() selectField: selectField;
  @Input() textField: textField;
  @Input() yesNo: boolean;
  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  inputValue: string = '';
  textvalue: string = '';
  formatedRadio: radioButtons[] = [];

  placeholder: string = '';
  labelShow: string = '';
  selectName: string = '';

  constructor() { }

  ngOnInit() {
    if(this.radioButtons) {
      this.formatedRadio = formatValues(this.radioButtons);
    }
    if(this.textField) {
      this.placeholder = this.textField.label;
    }
    if(this.yesNo){
      this.formatedRadio.push({id: 0, title: 'Sim'});
      this.formatedRadio.push({id: 1, title: 'Não'});
    }
  }

  showLabel() {
    this.labelShow = this.textField.label;
    this.placeholder = '';
  }

  hideLabel() {
    if(!this.textvalue && this.textField !== null){
      this.labelShow = '';
      this.placeholder = this.textField.label;
    }
  }

  getSelectValue(event) {
    this.textvalue = event;
    this.optionChange()
  }

  optionChange() {
    if(!this.textField && !this.selectField ){ 
        this.sendValue.emit(this.inputValue);
    } else if(this.textField) {
      this.checkSubField('textField');
    } else if (this.selectField) {
      this.checkSubField('selectField');
    }
  }

  checkSubField(type){
    if(this[type].activeWhen.indexOf(this.inputValue) === -1) {
      this.textvalue = '';
    }
    let valueWithTextField = {radio: this.inputValue, textfield: {value: this.textvalue, name: this[type].name }};
    this.sendValue.emit(valueWithTextField);
  }
}
