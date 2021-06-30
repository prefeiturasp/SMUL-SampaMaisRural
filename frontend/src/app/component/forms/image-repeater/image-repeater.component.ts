import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { images } from 'src/app/models/forms.model';

@Component({
  selector: 'image-repeater',
  templateUrl: './image-repeater.component.html',
  styleUrls: ['./image-repeater.component.sass']
})

export class ImageRepeaterComponent implements OnInit {

  constructor() { }

  @Input() label: string;
  @Input() noPreview: boolean = false;
  @Output() sendImages: EventEmitter<any> = new EventEmitter();

  images: images[] = [];

  ngOnInit() {
  }

  selectImage(event) {
   let files = event.target.files;
    for(let f = 0; f < files.length; f++) {
      if (files[f]) {
        let fileImage = files[f];

        const reader = new FileReader();
        reader.readAsDataURL(files[f]);
        reader.onload = event => {
          this.images.push({preview: reader.result, file: fileImage});
        };
      }
    }
    event.srcElement.value = '';
    this.inputChange();
  }

  inputChange() {
    this.sendImages.emit(this.images);
  }

  removeImage(image) {
    let index = this.images.indexOf(image);
    this.images.splice(index, 1);
    this.inputChange();
  }
}
