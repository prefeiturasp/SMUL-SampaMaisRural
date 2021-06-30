import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { formFields } from './form-data';
import { t, tInterface, tforms, translateCat } from '../../utils/translate';
import { FormsService } from 'src/app/services/forms.service';
import { formDefinition } from 'src/app/models/forms.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-add-place',
  templateUrl: './form-add-place.component.html',
  styleUrls: ['./form-add-place.component.sass']
})
export class FormAddPlaceComponent implements OnInit {

  formFields = formFields;
  selectedForm: formDefinition = {category: '', subcategory: ''};
  currentForm;
  currentStage: number;
  dataBeenSent: boolean;
  formData: object = {};
  alertFields: string = '';
  backupFormSelected: object = {};
  contactInfo: object = {};
  loading:  boolean;
  address: string;
  t: tInterface = t;
  wrongFields: Array<String> = [];
  errorMessage: string = '';
  requestSubs: Subscription;

  @ViewChild('alertFormElement', {static: false}) alertFormElement: ElementRef;

  constructor(private formsService: FormsService) { }

  ngOnInit() {
    this.dataBeenSent = false;
    this.loading = false;
    this.currentStage = 0;
  }

  resetForm(){
    this.dataBeenSent = false;
    this.backupFormSelected = {};
    this.currentForm = null;
    this.currentStage = 0;
    this.formData = {};
    this.contactInfo = {};
    this.address = '';
    this.errorMessage = '';
  }

  //Form Constructor

  checkIfRedirect(){
    if(this.selectedForm.subcategory === t.idec_subcategories) {
      window.open('http://feirasorganicas.org.br/adicionar-local/');
    } else {
      this.loadForm();
    }
  }

  loadForm() {
    if(this.backupFormSelected !== this.selectedForm) {
      this.wrongFields = [];
      this.alertFields = '';
      this.errorMessage = '';
      this.showForm();
    }else {
      this.currentStage++;
    }
}

  showForm(){
    if(this.selectedForm.category && this.selectedForm.subcategory){
      this.address = '';
      let stages = this.formFields[this.selectedForm['category']][this.selectedForm['subcategory']]['stages'];
      this.backupFormSelected = {category: this.selectedForm['category'], subcategory: this.selectedForm['subcategory']}
      if(stages) {
        this.currentForm = this.formFields[this.selectedForm['category']][this.selectedForm['subcategory']]['stages'];
        this.currentForm = stages;
        this.currentStage++;
        window.scroll(0,0);
      }
    }
  }

  checkCurrentStage(currentStageN) {
    return this.currentForm.indexOf(currentStageN) === this.currentStage - 1;
  }

  nextStage() {
    window.scroll(0,0);
    this.currentStage++;
    if(this.alertFields) {
      this.validateForm();
    }
  }

  backStage() {
    window.scroll(0,0);
    this.currentStage--;
  }

  active(cat) {
    this.selectedForm.category = cat;
  }

  checkActive(cat) {
    return this.selectedForm.category === cat;
  }

  getSubcategories() {
    if(this.formFields[this.selectedForm.category]) {
      return Object.keys(this.formFields[this.selectedForm.category]).sort();
    }
  }

  getSubcategory(event) {
    this.selectedForm.subcategory = event;
  }

  //Form Validation
  checkInvalid(field){
    return !(this.wrongFields.indexOf(field.label) >-1 || this.wrongFields.indexOf(field.title) > -1 ||
    (field.textField && this.wrongFields.indexOf(field.textField.label) > -1))
  }

  validateForm() {
    this.alertFields = '';
    this.specificValidations();
    for(let area = 0; area < this.currentForm[0].areas.length; area++){
      let fieldsData = this.currentForm[0].areas[area].fields;
      for (let data = 0; data < fieldsData.length; data++) {
        this.validateInput(fieldsData[data], this.formData[fieldsData[data].name]);
        this.validateSecundaryInput(fieldsData[data], 'textField');
        this.validateSecundaryInput(fieldsData[data], 'selectField');
      }
    }
    if (this.wrongFields) { this.alertFields = this.wrongFields.join(', '); }
    return (!(this.wrongFields.length))
  }

  validateSecundaryInput(fieldsData, type){
    if((fieldsData[type] && fieldsData[type].required) &&
    !(this.formData[fieldsData[type].name]  && this.formData[fieldsData[type].name].length)){
      if(fieldsData[type].activeWhen.indexOf(this.formData[fieldsData.name]) > -1){
        this.wrongFields.push(fieldsData[type].label || fieldsData[type].title);
      }
    }
  }

  validateInput(inputInfo, input){
    let valid = true;
    if(inputInfo && input && inputInfo.name !== tforms.names.authorize_information){
      valid = this.validateTextInput(inputInfo, input) && this.validateNumberInput(inputInfo, input) &&
      this.validateEmailInput(inputInfo, input) && this.validatePhoneInput(inputInfo, input) &&
      this.validatePhoneRepeater(inputInfo, input);
    } else {
      valid = this.isValidInput(inputInfo, input);
    }
    if(!valid){this.wrongFields.push(inputInfo.label || inputInfo.title);}
  }

  isValidInput(inputInfo, input)  {
    return !inputInfo.required || (input && input.length);
  }

  validateNumberInput(inputInfo, input){
    return !(inputInfo.subtype && inputInfo.subtype === 'number' && (parseInt(input) > inputInfo.max
    || parseInt(input) < inputInfo.min))
  }

  validatePhoneInput(inputInfo, input){
    return !(inputInfo.type && inputInfo.type === 'phone' && !(input.length > 9 && input.length < 12))
  }

  validatePhoneRepeater(inputInfo, input){
    let phoneArrayValid = true;
    if(inputInfo.type && inputInfo.type === 'phone-repeater'){
      phoneArrayValid = this.validatePhoneArray(input, inputInfo);
    }
    return phoneArrayValid;
  }

  validatePhoneArray(input, inputInfo){
    let phonesValidation = true;
    for(let phone of input){
      if((phone.value.length && !(phone.value.length > 9 && phone.value.length < 12)) ||
      this.checkPhoneRepeaterKind(inputInfo, phone)){
        phonesValidation = false;
      }
    }
    return phonesValidation;
  }

  checkPhoneRepeaterKind(inputInfo, phone){
    return(!inputInfo.hideType && phone.kind === null && !!phone.value && phone.name !== 'whatsapp');
  }

  validateEmailInput(inputInfo, input){
    let emailValidator = /\S+@\S+\.\S+/;
    return !(inputInfo.subtype && inputInfo.subtype === 'email' && !emailValidator.test(input))
  }

  validateTextInput(inputInfo, input){
    return !(inputInfo.subtype && inputInfo.subtype === 'text' && (inputInfo.min && input.length < inputInfo.min)
    || (inputInfo.max && input.length > inputInfo.max))
  }

  specificValidations(){
    if(this.formData[tforms.names.cpf] && this.formData[tforms.names.cpf].length !== 11){
      this.wrongFields.push(tforms.titles.cpf);
    }
  }

  validateFormSize() {
    const limit = 20; // MB
    const self = this;
    if (!self.formsService.validateImageSize(self.formData, 5)) {
      self.errorMessage = `Cada imagem não deve ultrapassar 5 MB`;
      self.alertFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    if (!self.formsService.validateFormSize(self.formData, limit)) {
      self.errorMessage = `A soma do tamanho das imagens não deve passar de ${limit} MB`;
      self.alertFormElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  //Form Send
  async sendDataToService(){
    this.errorMessage = '';
    this.wrongFields = [];
    if(this.validateFormSize() && this.validateForm()){
      this.loading = true;
      this.formatInfoToSend();
      this.formData[tforms.names.activities] = [];
      if (!(this.formData[tforms.names.product_list])) {
        this.formData[tforms.names.product_list] = [];
      }
      this.divideOtherQualifications();
      this.verifyIfSharesAdress();
      let type = translateCat(this.selectedForm.category).toLowerCase();
      this.requestSubs = await this.formsService.sendForm(this.formData, type, '/partners/' + type).subscribe(
        (response) => {
          this.dataBeenSent = true;
          this.loading = false;
        },
        (error) => {
          this.errorMessage = 'Erro ao enviar. Por favor, tente novamente.';
          this.loading = false;
        }
      );
    }
  }

  verifyIfSharesAdress(){
    if(this.formData[tforms.names.shareAddress]){
      this.formData[tforms.names.shareAddressBol] = this.formData[tforms.names.shareAddress].includes(t.share)? true : false;
    }
  }

  formatInfoToSend(){
    this.formData[tforms.names.family_work] = this.formData[tforms.names.family_work] === 'Sim'? true : false;
    this.formData[tforms.names.subcategory_list] = [this.selectedForm.subcategory];
  }

  divideOtherQualifications(){
    let qualification_list = this.formData[tforms.names.qualification_list];
    if(qualification_list && qualification_list.length){
      this.pushToCorrectFields(qualification_list)
      this.pushToActivitiesList(qualification_list, t.scheduling);
      this.pushToActivitiesList(qualification_list, t.only_groups);
    }
  }

  pushToCorrectFields(qualification_list){
    if(qualification_list.indexOf(t.parking) > -1){
      this.formData[tforms.names.park] = t.free;
    }
    this.qualificationToTrue(qualification_list, t.family_work, tforms.names.family_work);
    this.qualificationToTrue(qualification_list, t.accessibility, tforms.names.disabled);
  }

  qualificationToTrue(qualifications, title, name){
    if(qualifications.indexOf(t[title]) > -1){
      this.formData[tforms.names[name]] = 'Sim';
    }
  }

  pushToActivitiesList(field, value){
    if(field.indexOf(value) > -1){
      this.formData[tforms.names.activities].push(value);
    }
  }

  pushToActivities(label, field){
    if(typeof this.formData[label] === 'string' || this.formData[label] instanceof String){
      this.formData[field].push(this.formData[label]);
    } else{
      this.formData[field].push(...this.formData[label] ? this.formData[label] : []);
    }
  }

  //Form Values
  getValue(inputValue) {
    if(inputValue.length) {
      for(let e = 0; e < inputValue.length; e++) {
        this.formData[inputValue[e].name] = inputValue[e].value;
      }
    } else {
      this.formData[inputValue.name] = inputValue.value;
    }
    this.sendSameDataContact();
    this.formatGeoLocation();
    this.dividePhonesToSend();
    this.getAdress();
    this.getGender();
  }

  getGender(){
    if(this.formData[tforms.names.gender_other]){
      this.formData[tforms.names.gender] = this.formData[tforms.names.gender_other];
    }
  }

  formatGeoLocation(){
    if(this.formData[tforms.names.map]){
      this.formData['_lon'] = this.formData[tforms.names.map].lon;
      this.formData['_lat'] = this.formData[tforms.names.map].lat;
    }
  }

  getAdress(){
    if(this.formData[tforms.names.address]){
      this.address = this.formData[tforms.names.address];
    }
  }

  sendSameDataContact(){
    if(this.formData[tforms.names.sameData] && this.formData[tforms.names.sameData][0] === t.same_data) {
      let contact = {};
      contact['email'] = this.sendSameEmail();
      contact['phone'] = this.sendSamePhone();
      this.contactInfo = {...contact};
    } else {
      this.contactInfo = null;
    }
  }

  sendSameEmail(){
    return this.formData['email'] ?  this.formData['email'] : '';
  }

  sendSamePhone(){
    const phones = this.formData[tforms.names.comercial_phone];

    if (phones && phones[1].value)  {
      return phones[1];
    }

    if (phones && phones[0].value)  {
      return phones[0];
    }

    return '';
  }

  dividePhonesToSend(){
    if(this.formData[tforms.names.comercial_phone]){
    this.formData[tforms.names.other_phone] = [];
    this.formData[tforms.names.commercial_phone0] = [];
    this.formData[tforms.names.commercial_phone1] = [];
    this.formData['phones_attributes'] = [];
    this.formData[tforms.names.cellphones] = [];
      for(let index = 0; index < this.formData[tforms.names.comercial_phone].length; index++){
        this.divideEachPhone(index);
      }
    }
  }

  divideEachPhone(index){
    const phone = this.formData[tforms.names.comercial_phone][index];
    this.formData['phones_attributes'].push({ kind: phone.kind, phone_number: phone.value, scope: (phone.scope || 'commercial') })
  }

  ngOnDestroy(){
    if(this.requestSubs){
      this.requestSubs.unsubscribe();
    }
  }
}
