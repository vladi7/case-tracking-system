import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateserviceService {

  constructor(private http: HttpClient, private router: Router) { }

  createCasePost(name, manager, date, COI){
     this.http.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/case/', {name, manager, date, COI }).subscribe(data => {
       let map = new Map<string, string>();
       map.set('filename', '');
       map.set('url', '');
       let arrayJson = [];
       let jsonObject = {};
       map.forEach((value, key) => {
         jsonObject[key] = value;
       });
       arrayJson.push(jsonObject);
       const DocumentID = name;
       this.http.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/document/', {DocumentID, urls : arrayJson }).subscribe((result2: any) => {
         console.log(result2);
         this.router.navigate(['/app-caselist']);
       });
    });
    this.router.navigate(['/app-caselist']);
  }
}
