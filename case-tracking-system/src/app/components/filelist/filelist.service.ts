import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilelistService {

  constructor(private httpClient: HttpClient) { }
  getAllDocumentsForACase(caseName){
    return this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/' + caseName);
  }

  deleteCase (id) {
    return this.httpClient.delete<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/cases/' + id);
  }

  deleteDocumentsForTheCase(id){
    return this.httpClient.delete<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/documents/' + id);

  }
}
