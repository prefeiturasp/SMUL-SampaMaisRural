import { Component, OnInit, Input } from '@angular/core';
import { PlaceService } from 'src/app/services/place.service';
import { FormsService } from 'src/app/services/forms.service';
import { t, tInterface } from '../../utils/translate';
import { validateEmail } from '../../utils/tools';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'suggest-edit',
  templateUrl: './suggest-edit.component.html',
  styleUrls: ['./suggest-edit.component.sass']
})
export class SuggestEditComponent implements OnInit {

  @Input() place: Place;
  fieldValid: object;
  form: string = '';
  formInputs: object = {};
  warning: boolean = false;
  messageSent: boolean = false;
  loading: boolean = false;
  emptyField: string = null;
  t: tInterface = t;

  constructor(
    private placeService: PlaceService,
    private formsService: FormsService) { }

  ngOnInit() {
  }

  checkFormImage(){
    return this.form === 'images';
  }

  openForm(form) {
    if(this.place.source !== t.idec) {
      this.fieldValid = {name: true, email: true, message: true, phone: true, attachments_attributes: true};
      this.form = form;
      this.loading = false;
      this.messageSent = false;
      this.placeService.setMenuHide(true);
    }else{
      window.open(
        this.place.external_link,
        '_blank'
      );
    }
  }

  getInputValue(event){
    this.formInputs[event.name] = event.value;
  }

  closeForm() {
    this.formInputs = [];
    this.emptyField = '';
    this.warning = false;
    this.form = '';
  }

  validateRequireds(){
    let valid = true;
    if(!this.formInputs['name']){
      this.fieldValid['name'] = false;
      valid = false;
    }

    if(!this.formInputs['message'] && !this.checkFormImage()){
      this.fieldValid['message'] = false;
      valid = false;
    }
    return valid;
  }

  validateEmail(){
    let valid = true;
    this.fieldValid['email'] = validateEmail(this.formInputs['email']);
    valid = this.fieldValid['email'];
    return valid;
  }

  validateImg(){
    let valid = true;
    if((!this.formInputs['attachments_attributes'] || !this.formInputs['attachments_attributes'].length) && this.checkFormImage()){
      this.fieldValid['attachments_attributes'] = false;
      valid = false;
    }
    return valid;
  }

  validateAll(){
    return this.validateRequireds() && this.validateEmail() && this.validateImg();
  }

  async sendSuggestion() {
    this.fieldValid = {name: true, email: true, message: true, phone: true, attachments_attributes: true};
    this.warning = false;
    this.formInputs['suggestable_id'] = this.place.id;

    if(this.validateAll()){
      this.loading = true;
      await this.formsService.sendForm(this.formInputs, 'suggestion', '/resources/suggestion').toPromise();
      this.loading = false;
      this.messageSent = true;
      this.formInputs = [];
      this.emptyField = '';
      this.placeService.setMenuHide(false);
    }else{
      this.warning = true;
    }
  }

  closePopUp() {
    this.form = '';
    this.placeService.setMenuHide(false);
  }
}
