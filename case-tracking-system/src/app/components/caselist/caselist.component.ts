import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {CaselistService} from './caselist.service';

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
  constructor(public authService: AuthService, private caselistService: CaselistService) {
    this.currentUserEmail = this.authService.getUserData;
    this.caselistService.getAllCasesForAUser().subscribe((result: any) => {
        this.caseList = Object.keys(result).map(keyForHits => {
          return{
            name: result[keyForHits].data.name, manager: result[keyForHits].data.manager
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

  filterData(data){
    for (let i = 0; i < data.length; i++) {

        if (data[i].manager === this.currentUserEmail){
          this.newData.push(data[i]);
        }
      }
    return this.newData;
      }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

log(value) {
    console.log(value);
}
}

