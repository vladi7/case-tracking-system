import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaselistService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private httpClient: HttpClient) { }
  //call the api to retrieve all the cases
  getAllCasesForAUser(){
    return this.httpClient.get<any>('https://rest-service-case-tracking.firebaseapp.com/api/v1/cases/', this.httpOptions);
  }



}
