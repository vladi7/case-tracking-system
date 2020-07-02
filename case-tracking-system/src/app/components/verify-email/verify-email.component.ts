//Full Angular 7: 8|9 Firebase Authentication System.” PositronX.io, 2 June 2020, www.positronx.io/full-angular-7-firebase-authentication-system/.
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
