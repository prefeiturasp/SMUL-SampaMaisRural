import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.sass']
})
export class SelectInputComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() options: Array<string>;
  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  labelShow: string = '';
  placeholder: string = '';
  valueInput: string = '';
  showOptions: boolean = false;

  ngOnInit() {
  }

  ngOnChanges() {
    if(!this.labelShow){
      this.placeholder = this.label;
    }
    if(!this.options) {
      this.valueInput = '';
      this.sendData();
    }
  }

  showLabel() {
    this.labelShow = this.label;
    this.placeholder = '';
    this.showOptions = true;
    this.valueInput = '';
  }

  sendData() {
    this.sendValue.emit(this.valueInput);
  }

  hideLabel() {
    if(!this.valueInput && this.valueInput !== ''){
      this.labelShow = '';
      this.placeholder = this.label;
    }
    this.sendData();
    this.hideOptions();
  }

  setValue(value) {
    this.valueInput = value;
    this.sendData();
    this.hideOptions();
  }

  hideOptions(){
    setTimeout(() =>{
      this.showOptions = false;
    }, 350);
  }
}
