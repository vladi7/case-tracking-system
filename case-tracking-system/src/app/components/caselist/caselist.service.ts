import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CaselistService {

  constructor(private httpClient: HttpClient) { }

  getAllCasesForAUser(){
    return this.httpClient.get<any>('https://cors-anywhere.herokuapp.com/https://rest-service-case-tracking.firebaseapp.com/api/v1/cases/');
  }



}
