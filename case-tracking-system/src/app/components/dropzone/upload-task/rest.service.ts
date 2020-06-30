import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  filelist = [];
  constructor(private httpClient: HttpClient) { }
  updateDocumentsForACase(DocumentID, jsonObject){
     this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/' + DocumentID).subscribe((result: any) => {
        this.filelist = result.data.urls;
        this.filelist.push(jsonObject);
        this.httpClient.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/', {DocumentID, urls : this.filelist }).subscribe((result2: any) => {
        console.log(result2);
        });
      }, error => {
       console.log(error);
      }
    );
  }
}
