//Full Angular 7: 8|9 Firebase Authentication System.” PositronX.io, 2 June 2020, www.positronx.io/full-angular-7-firebase-authentication-system/.
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( public authService: AuthService,) { }

  ngOnInit(): void {
  }

}
