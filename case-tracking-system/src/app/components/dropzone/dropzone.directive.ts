//Delaney, Jeff. “Upload Multiple Files to Firebase Storage with Angular.” Fireship.io, Fireship.io, 18 Feb. 2019, fireship.io/lessons/angular-firebase-storage-uploads-multi/.
import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dropzone]'
})
export class DropzoneDirective {

  @Output() dropped =  new EventEmitter<FileList>();
  @Output() hovered =  new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}
