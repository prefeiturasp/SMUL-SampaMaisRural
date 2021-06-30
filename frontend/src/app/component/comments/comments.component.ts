import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { t } from '../../utils/translate';
import { validateEmail } from '../../utils/tools';
import { CommentsService } from 'src/app/services/comments.service';
import { Subscription } from 'rxjs';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.sass']
})
export class CommentsComponent implements OnInit {

  formValues: object = {};
  fieldValid: object = {name: true, email: true, data: true, recaptcha: true};
  warning: boolean = false;
  comments = [];
  emptyField: string = null;
  loading: boolean = false;
  messageSent: boolean = false;
  reactiveForm: FormGroup;
  requestSubs: Subscription[] = [];
  sendError: boolean = false;
  commentsError: boolean = false;

  @ViewChild('captchaRef', {static: false}) captchaRef: any;
  @Input() placeId: number;

  constructor(private commentService: CommentsService,
    private formService: FormsService) { }

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }

  getInputValue(event){
    this.formValues[event.name] = event.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getComments(changes.placeId.currentValue);
    if (this.captchaRef) {
      this.captchaRef.reset();
    }
  }

  validateComment() {
    this.fieldValid = {name: true, email: true, data: true, recaptcha: true};
    this.warning = false;
    if(this.validateFields()){
      this.sendComment();
    }else{
      this.warning = true;
    }
  }

  validateFields(){
    let valid = true;
    if(!this.formValues['name']){
      this.fieldValid['name'] = false;
      valid = false;
    }

    if(!validateEmail(this.formValues['email'])){
      this.fieldValid['email'] = false;
      valid = false;
    }

    if(!this.reactiveForm.valid){
      this.fieldValid['recaptcha'] = false;
      valid = false;
    }

    if(!this.formValues['data']){
      this.fieldValid['data'] = false;
      valid = false;
    }
    return valid;
  }

  async sendComment() {
    this.loading = true;
    this.sendError = false;
    this.formValues['partner_id'] = this.placeId;
    this.requestSubs.push(await this.formService.sendForm(this.formValues, 'comment', `/resources/comment`).subscribe(
      res => this.commentSent(),
      err => this.commentNotSent()
    ));
  }

  commentNotSent(){
    this.loading = false;
    this.sendError = true;
  }

  commentSent(){
    this.formValues = {};
    this.loading = false;
    this.messageSent = true;
    this.emptyField = '';
  }

  closePopUp() {
    this.messageSent = false;
  }

  async getComments(placeId: number) {
    this.commentsError = false;
    this.requestSubs.push(await this.commentService.getComments(placeId).subscribe(
      res => this.comments = res['comments'],
      err => this.commentsError = true
    ))
  }

  formatData(date){
    let dateFormated: any = new Date(date);
    let hours = Math.abs(new Date().getTime() - dateFormated) / 36e5;
    if(hours <= 24 && hours > 1){
      return this.getHours(hours);

    } else if(hours < 1) {
      let minutes = hours * 60;
      return this.getMinutes(minutes);

    } else if(hours > 24) {
      let diffDays = new Date().getDate() - dateFormated.getDate();
      return this.getDays(diffDays);
    }
  }

  getHours(hours){
    return t.from + ' ' + hours.toFixed() +  (hours >= 2 ? ' ' + t.hours : ' ' + t.hour) + ' ' + t.ago;
  }

  getMinutes(minutes){
    return t.from + ' ' + minutes.toFixed() + ' ' + t.minutes + ' ' + t.ago;
  }

  getDays(diffDays){
    return t.from + ' ' + diffDays +  (diffDays > 1 ? ' ' + t.days : ' ' + t.day) + ' ' + t.ago;
  }

  ngOnDestroy(){
    for(let subs of this.requestSubs){
      subs.unsubscribe();
    }
  }
}
