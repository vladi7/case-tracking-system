//Delaney, Jeff. “Upload Multiple Files to Firebase Storage with Angular.” Fireship.io, Fireship.io, 18 Feb. 2019, fireship.io/lessons/angular-firebase-storage-uploads-multi/.
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  isHovering: boolean;

  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
