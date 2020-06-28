import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private http: HttpClient) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    // The storage path
    const path = `test/${Date.now()}_${this.file.name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        console.log(this.downloadURL + path);
        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
        const CaseID = 'case1';
        const url = this.downloadURL + path;
        this.http.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/', {CaseID, urls : {url} }).subscribe(data => {
          console.log(data);
        });

      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
