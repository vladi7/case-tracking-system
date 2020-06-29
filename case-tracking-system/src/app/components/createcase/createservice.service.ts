import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateserviceService {

  constructor(private http: HttpClient) { }

  createCasePost(name, manager, date, COI){
    return this.http.post<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/case/', {name, manager, date, COI });

  }
}
