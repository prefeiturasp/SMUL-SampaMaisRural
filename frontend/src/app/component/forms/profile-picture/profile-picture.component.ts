import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.sass']
})
export class ProfilePictureComponent implements OnInit {

  @Input() label: string;
  @Output() sendProfilePicture: EventEmitter<any> = new EventEmitter();

  previewImage: string | ArrayBuffer = null;

  constructor() { }

  ngOnInit() {
  }

  selectImage(event) {
    let file = event.target.files[0];
    event.srcElement.value = '';
    if (file) {
      let fileImage = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.previewImage = reader.result;
        this.sendProfilePicture.emit(fileImage);
      };
    }
  }

  deleteImage() {
    this.previewImage = null;
    this.sendProfilePicture.emit('');
  }
}
