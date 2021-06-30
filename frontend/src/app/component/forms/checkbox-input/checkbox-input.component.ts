import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { t } from '../../../utils/translate';
import { checkboxes } from 'src/app/models/forms.model';
import { formatValues } from '../../../utils/tools';
@Component({
  selector: 'checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.sass']
})
export class CheckboxInputComponent implements OnInit {

  @Input() title: string;
  @Input() otherField;
  @Input() checkboxes: Array<string>;
  @Input() fontLight: boolean;
  @Input() name: string;
  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  font: string = '';
  formatedCheckboxes: checkboxes[] = [];
  selectedValues: Array<string> = [];
  valueInput: string = '';
  labelShow: string = '';
  placeholder: string = '';
  label: string = t.other;
  storageInput: string;

  constructor() { }

  ngOnInit() {
    this.formatedCheckboxes= formatValues(this.checkboxes);
    this.placeholder = this.otherField ? this.label: '';
    this.font = this.fontLight? 'font-light' : '';
  }

  inputChange(){
    this.sendData();
  }

  optionValueToggle(id) {
    let selected = false;
    let value = this.formatedCheckboxes[id].title;
    for(let index = 0; index < this.selectedValues.length; index++) {
      if(this.selectedValues[index] === value){
        selected = true;
        this.selectedValues.splice(index, 1);
      }
    }
    if(!selected) { this.selectedValues.push(value); }
    
    this.sendData();
  }

  showLabel() {
    this.labelShow = this.label;
    this.placeholder = '';
  }

  hideLabel() {
    if(this.valueInput !== '' && !this.valueInput){
      this.labelShow = '';
      this.placeholder = this.label;
    }
  }

  sendData(){
    if(this.valueInput){
      let index = this.selectedValues.indexOf(this.storageInput);
      if(index > -1){
       this.selectedValues.splice(index, 1);
      }
      this.selectedValues.push(this.valueInput);
      this.storageInput = this.valueInput;
    }else {
      this.storageInput = null;
    }
    this.sendValue.emit(this.selectedValues);
  }
}
