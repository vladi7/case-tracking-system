//Full Angular 7: 8|9 Firebase Authentication System.” PositronX.io, 2 June 2020, www.positronx.io/full-angular-7-firebase-authentication-system/.
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() { }

}
