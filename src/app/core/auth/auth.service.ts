/**
 * @author -Ronak Patel.
 * @description - Create class for communicate between component and server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// ---------------------------------------------------------------------------------//
import { UserProfile } from '../../user-profile/user-profile.model';
import { environment } from '../../../environments/environment';
import { Auth } from './auth.model';

@Injectable()
export class AuthService {
  // Create for store baseUrl
  private baseUrl: string;
  // Create for store user data.
  public user: Auth;
  /**
   * @param http -Inject httpClient service for server interaction.
   */
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl + '/user_profile';
  }
  /**
   * @description -create for get user detail by Email id.
   * @param user -To store login detail and pass to the server.
   * @returns -Observable array.
   */
  public getUserByEmail(user: Auth): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(this.baseUrl, { params: { email: user.email, password: user.password } });
  }
}
