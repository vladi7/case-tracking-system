import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilelistService {

  constructor(private httpClient: HttpClient, private router: Router, public authService: AuthService) { }
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
  handleOtherCases(id){
    let currentUserEmail = this.authService.getUserData;
    this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/cases/' + id).subscribe((result: any) => {

      const COIlist = result.data.COI;
        for (let caseName of COIlist){
          this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/cases/' + caseName).subscribe((result2: any) => {

            let name = result2.data.name;
            let manager = result2.data.manager;
            let date = result2.data.date;
            let COI = result2.data.COI;
            let usersWithCOI = [];
            if (result2.data.usersWithCOI !== null && result2.data.usersWithCOI !== undefined){
              usersWithCOI = result2.data.usersWithCOI;
              if (!usersWithCOI.includes(currentUserEmail)){
                usersWithCOI.push(currentUserEmail);
              }
            }
            else {
              usersWithCOI.push(currentUserEmail);
            }
            this.httpClient.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/case/', {name, manager, date, COI, usersWithCOI })
              .subscribe((result3: any) => {
                console.log(result3);
              }, error => {
                console.log(error);
              });
            // filelist = this.filterData(filelist, id);
            // this.httpClient.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/', {DocumentID, urls : filelist }).subscribe((result2: any) => {
            //   console.log(result2);
            // });
          }, error => {
            console.log(error);
          });
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
