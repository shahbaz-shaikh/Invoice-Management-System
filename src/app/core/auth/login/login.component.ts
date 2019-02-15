/**
 * @author - Ronak Patel.
 * @description - Create class for user login .
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// -------------------------------------------------------------------------------------------------//
import { Auth } from '../auth.model';
import { AuthService } from '../auth.service';
import { UserProfile } from '../../../user-profile/user-profile.model';

@Component({
  selector: 'ims-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // store login detail
  public userEmail: string;
  public userPassword: string;

  // inject Authservice and Router.
  constructor(private service: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  /**
   * Create for recive data from login html and call getUserByEmail method and subscribe it.
   * @param user - Create for store data.
   */
  public onSubmit(user: Auth): void {
    this.service.getUserByEmail(user).subscribe((data: UserProfile[]) => {
      // Check user data and login data match or not.
      if (data.length !== 0) {
        if (this.userEmail === data[0].email && this.userPassword === data[0].password) {
          this.service.user = user;
          localStorage.setItem('token', user.email);
          localStorage.setItem('tokenName', data[0].name);
          this.router.navigate(['dashboard']);
        }
      } else {
        alert('Incorrect Email address or Password.');
      }
    }
    );
  }
}
