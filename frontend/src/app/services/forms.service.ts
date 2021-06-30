import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  formData: FormData;
  constructor(private http: HttpClient) { }

  formatAttachments(attachments_attributes) {
    if (attachments_attributes) {
      for (let index = 0; index < attachments_attributes.length; index++) {
        attachments_attributes[index] = attachments_attributes[index].file;
      }
    }
    return attachments_attributes;
  }

  generateFormData(info, name) {
    let keys = Object.keys(info);
    for (let key of keys) {
      if (info[key] !== undefined) {
        if (key === 'attachments_attributes') {
          this.addImageToForm(info[key], key, name);
        } else if (key === 'phones_attributes') {
          this.addPhonesToForm(info[key], key, name);
        } else {
          this.addFieldsToForm(info[key], key, name);
        }
      }
    }
  }

  addFieldsToForm(info, key, name) {
    if (!key.includes('_internal')) {
      if (Array.isArray(info) && info.length) {
        this.formData.append(name + '[' + key + ']', info.join(';'));
      } else {
        this.formData.append(name + '[' + key + ']', info);
      }
    }
  }

  addImageToForm(info, key, name) {
    for (let index = 0; index < info.length; index++) {
      this.formData.append(name + '[' + key + '][][file]', info[index], info[index].name);
    }
  }

  addPhonesToForm(info, key, name) {
    for (let index = 0; index < info.length; index++) {
      this.formData.append(name + '[' + key + '][][phone_number]', info[index].phone_number);
      this.formData.append(name + '[' + key + '][][scope]', info[index].scope);
      this.formData.append(name + '[' + key + '][][kind]', info[index].kind);
    }
  }

  validateImageSize(info, limitSize) {
    const attachments_attributes = info.attachments_attributes;
    const attachments = [];

    if (attachments_attributes) {
      for (let index = 0; index < attachments_attributes.length; index++) {
        attachments[index] = attachments_attributes[index].file.size;
      }
    }

    let size = 0;
    for (const attachmentSize of attachments) {
      size += Math.round(attachmentSize / 1024 / 1024);
    }

    return size <= limitSize;
  }


  validateFormSize(info, limitSize) {
    const attachments_attributes = info.attachments_attributes;

    if (attachments_attributes) {
      for (let index = 0; index < attachments_attributes.length; index++) {
        const size = attachments_attributes[index].file.size;
        if (Math.round(size / 1024 / 1024) > limitSize) {
          return false;
        }
      }
    }

    return true;
  }

  sendForm(info, name, apiUrl) {
    let url = API_URL + apiUrl;
    this.formData = new FormData();
    info.attachments_attributes = this.formatAttachments(info.attachments_attributes);
    this.generateFormData(info, name)
    return this.http.post(url, this.formData);
  }
}
