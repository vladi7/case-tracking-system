import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FilelistService} from './filelist.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {
  currentUserEmail;
  id;
  errors;
  fileList;
  urls;
  CaseName;
  newData = [];
  // component to display and act on the files, as well as uploading the files
  constructor(public authService: AuthService, private documentlistService: FilelistService, private activatedroute: ActivatedRoute, private router: Router) {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.CaseName = this.id;
    this.currentUserEmail = this.authService.getUserData;
    this.documentlistService.getAllDocumentsForACase(this.id).subscribe((result: any) => {
      this.fileList = result.data.urls;
      this.fileList = this.filterData( this.fileList);
      console.log(this.fileList);
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      }
    );
    this.documentlistService.handleOtherCases(this.id);
  }

  ngOnInit(): void {
  }
  // method to delete the case
  deleteCase(){
    this.documentlistService.deleteCase(this.id).subscribe(data => {
      console.log(data);
    });
    this.documentlistService.deleteDocumentsForTheCase(this.id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/app-caselist']);

    });
  }
  // method to delete the files
  deleteFile(filename){
    this.documentlistService.deleteFile(this.id, filename);
  }
  // method to display only the files with a filename
  filterData(data){
    this.newData = [];
    for (let i = 0; i < data.length; i++) {

      if (data[i].filename !== ''){
        this.newData.push(data[i]);
      }
    }
    return this.newData;
  }
  //method to refresh the page
  refresh(){
    this.documentlistService.getAllDocumentsForACase(this.id).subscribe((result: any) => {
        this.fileList = result.data.urls;
        this.fileList = this.filterData( this.fileList);
        console.log(this.fileList);
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      }
    );
  }
}
