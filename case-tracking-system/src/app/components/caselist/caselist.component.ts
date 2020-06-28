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
  errors;
  currentUserEmail;
  constructor( public authService: AuthService, private caselistService: CaselistService) {
  }

  ngOnInit(): void {
   // console.log(this.authService.userData.email);
   // console.log(this.authService.getUserData);
    this.currentUserEmail = this.authService.getUserData;
    this.caselistService.getAllCasesForAUser().subscribe((result: any) => {
      this.caseList = Object.keys(result).map(keyForHits => {
        console.log(result[keyForHits].data.manager);
        if (result[keyForHits].data.manager === this.currentUserEmail){
          return{
            name: result[keyForHits].data.name, manager: result[keyForHits].data.manager
          };
        }
      });
      console.log(this.caseList);
        // this.caseList = Object.keys(result.hits).map(keyForHits => {
        //   const recipe = result.hits[keyForHits].recipe;
        //   console.log(keyForHits);
        //   return {
        //     name: recipe.label, icon: recipe.image, url: recipe.url
        //   };
        // });
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      }
    );
  }
  findUserOnPage(name){
    //console.log(name);
    // this.caselistService.getAllCasesForAUser("Vlad").subscribe((result: any) => {
    //   console.log(result);
    //     // this.caseList = Object.keys(result.hits).map(keyForHits => {
    //     //   const recipe = result.hits[keyForHits].recipe;
    //     //   console.log(keyForHits);
    //     //   return {
    //     //     name: recipe.label, icon: recipe.image, url: recipe.url
    //     //   };
    //     // });
    //   }, error => {
    //     this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
    //   }
    // );
}
}
