//Delaney, Jeff. “Upload Multiple Files to Firebase Storage with Angular.” Fireship.io, Fireship.io, 18 Feb. 2019, fireship.io/lessons/angular-firebase-storage-uploads-multi/.
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {RestService} from './rest.service';

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

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private http: HttpClient, private router: Router, private rest: RestService) { }

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
        const DocumentID = this.router.url.slice(14);
        const url = this.downloadURL + path;
        let filename = this.file.name;
        let map = new Map<string, string>()
        map.set('filename', filename);
        map.set('url', url);
        // let arrayJson = [];
        let jsonObject = {};
        map.forEach((value, key) => {
          jsonObject[key] = value;
        });
        this.rest.updateDocumentsForACase(DocumentID, jsonObject);


        // arrayJson.push(jsonObject);
        // this.http.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/', {DocumentID, urls : arrayJson }).subscribe(data => {
        //   console.log(data);
        // });

      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
