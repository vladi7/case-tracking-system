import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {FilelistService} from './filelist.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(public authService: AuthService, private documentlistService: FilelistService, private activatedroute: ActivatedRoute) {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
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

}
