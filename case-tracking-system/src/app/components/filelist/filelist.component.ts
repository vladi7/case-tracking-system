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
  constructor(public authService: AuthService, private documentlistService: FilelistService, private activatedroute: ActivatedRoute, private router: Router) {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.CaseName = this.id;
    this.currentUserEmail = this.authService.getUserData;
    this.documentlistService.getAllDocumentsForACase(this.id).subscribe((result: any) => {
      this.fileList = result.data.urls;
      console.log(this.fileList);
      }, error => {
        this.errors = 'Error when submitting request. Check your input. Also, you might need to wait since the api calls are limited.';
      }
    );
  }

  ngOnInit(): void {
  }

  deleteCase(){
    this.documentlistService.deleteCase(this.id).subscribe(data => {
      console.log(data);
    });
    this.documentlistService.deleteDocumentsForTheCase(this.id).subscribe(data => {
      console.log(data);
      this.router.navigate(['/app-caselist']);

    });
  }
}
