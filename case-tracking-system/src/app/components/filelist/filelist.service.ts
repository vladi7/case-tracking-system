import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilelistService {

  constructor(private httpClient: HttpClient, private router: Router) { }
  getAllDocumentsForACase(caseName){
    return this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/' + caseName);
  }

  deleteCase (id) {
    return this.httpClient.delete<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/cases/' + id);
  }

  deleteDocumentsForTheCase(id){
    return this.httpClient.delete<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/documents/' + id);

  }

  deleteFile(DocumentID, id){
    this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/' + DocumentID).subscribe((result: any) => {
        let filelist = [];
        filelist = result.data.urls;
        filelist = this.filterData(filelist, id);
        this.httpClient.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/', {DocumentID, urls : filelist }).subscribe((result2: any) => {
          console.log(result2);
        });
      }, error => {
        console.log(error);
      }
    );
  }
  filterData(data, urltodelete){
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].filename !== urltodelete){
        newData.push(data[i]);
      }
    }
    return newData;
  }
}
