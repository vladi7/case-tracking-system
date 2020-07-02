import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {CaselistService} from './caselist.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-caselist',
  templateUrl: './caselist.component.html',
  styleUrls: ['./caselist.component.css']
})

export class CaselistComponent implements OnInit {
  @ViewChild('user') user: ElementRef;
  caseList = [];
  newData = [];
  list;
  errors;
  currentUserEmail;
  constructor(public authService: AuthService, private caselistService: CaselistService, private router: Router) {
    this.currentUserEmail = this.authService.getUserData;
    this.caselistService.getAllCasesForAUser().subscribe((result: any) => {
        this.caseList = Object.keys(result).map(keyForHits => {
          return{
            name: result[keyForHits].data.name, manager: result[keyForHits].data.manager, COI: result[keyForHits].data.COI, usersWithCOI: result[keyForHits].data.usersWithCOI
          };
        });

        this.caseList = this.filterData(this.caseList);

      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      }
    );
  }

  ngOnInit(): void {
  }
// filters data to show only the cases with the access.
  filterData(data){
    this.newData = [];
    for (let i = 0; i < data.length; i++) {
      let users = [];
      users = data[i].usersWithCOI;
      console.log("Users from filter" + users);
      if(users !== undefined){
        if (data[i].manager.includes(this.currentUserEmail) && !users.includes(this.currentUserEmail)){
          this.newData.push(data[i]);
        }
      }else{
        if (data[i].manager.includes(this.currentUserEmail)){
          this.newData.push(data[i]);
        }
      }}

    return this.newData;
      }

log(value) {
    console.log(value);
}
//refresh the case list with all the changes
refresh(){
  this.currentUserEmail = this.authService.getUserData;

  this.caselistService.getAllCasesForAUser().subscribe((result: any) => {
      this.caseList = Object.keys(result).map(keyForHits => {
        return{
          name: result[keyForHits].data.name, manager: result[keyForHits].data.manager, COI: result[keyForHits].data.COI,  usersWithCOI: result[keyForHits].data.usersWithCOI
        };
      });

      this.caseList = this.filterData(this.caseList);
    }, error => {
      this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
    }
  );
}
}

