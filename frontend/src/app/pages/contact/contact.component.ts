import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsService } from 'src/app/services/forms.service';
import { formatPhone } from '../../utils/tools'
import { t } from '../../utils/translate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  label: Array<boolean> = [false, false, false ,false];
  placeholder: Array<string> = [t.name + '*', t.email + '*', t.phone, t.enter_message + '*'];
  validInput: Array<boolean> = [true, true , true , true];
  messageSent: boolean = false;
  loading: boolean = false;
  error: string = '';
  requestSubs: Subscription;
  
  constructor(private formsService: FormsService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.criarForm();
  }

  validate() {
    this.validInput = [true, true , true , true];
    this.error = '';
    let sendData = {
      name: this.contactForm.get('name').value,
      email: this.contactForm.get('email').value,
      phone: this.contactForm.get('phoneFormated').value,
      message: this.contactForm.get('message').value
    }
    let validation = true;
    if(!this.validateField('name', 0) || !this.validateField('email', 1)
    || !this.validateField('phone', 2) || !this.validateField('message', 3)){
      validation = false;
    }
    this.send(sendData, validation);
  }

  send(sendData, validation){
    if(validation){
      this.loading = true;
      this.requestSubs = this.formsService.sendForm(sendData, 'message', '/resources/message').subscribe(
      (response) => {
          this.loading = false;
          this.messageSent = true;
        },
      (error) => {
          this.loading = false;
          this.error = t.errorMessages.contactError;
        }
      );
    }
  }

  validateField(name, index){
    if(!this.contactForm.get(name).valid ){
      this.validInput[index] = false;
      return false;
    } else {
      return true;
    }
  }

  validateFone(){
    if(this.contactForm.get('phone').value !== null){
      if( this.contactForm.get('phone').value.length > 11 || this.contactForm.get('phone').value.length < 9){
        this.validInput[2] = false;
        return false;
      }
    }
  }

  criarForm() {
    this.contactForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null),
      phoneFormated: new FormControl(null),
      message: new FormControl(null, Validators.required)
    });
  }

  showLabel(inputN) {
    this.placeholder = [t.name + '*', t.email + '*', t.phone, t.enter_message + '*'];
    for (let i = 0; i < this.label.length; i++) {
      if(i === inputN){
        this.label[i] = true;
        this.placeholder[i] = '';
      }
    }
  }

  phoneChange() {
    let phone = formatPhone(this.contactForm.get('phone').value);
    this.contactForm.get('phone').setValue(phone);
    this.contactForm.get('phoneFormated').setValue(phone);
  }

  hideLabel(inputN, name) {
    if(!this.contactForm.get(name).value){
      this.placeholder = [t.name + '*', t.email + '*', t.phone, t.enter_message + '*'];
      this.label[inputN] = false;
    }else{
      this.label[inputN] = true;
    }
  }

  ngOnDestroy(){
    if(this.requestSubs){
      this.requestSubs.unsubscribe();
    }
  }
}
