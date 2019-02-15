/**
 * @author - Shahbaz Shaikh
 * @description - Create a service for user profile component communicate with server.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// --------------------------------------------------- //
import { environment } from '../../environments/environment';
import { UserProfile } from './user-profile.model';

@Injectable()
export class UserProfileService {

  // Declare the URL for server
  private baseUrl: string;

  constructor(private http: HttpClient) {
    // Define the URL for server
    this.baseUrl = environment.baseUrl;
  }

  /**
   * getUserByEmail get the logged in user deatils in user profile using get method
   * @param user - Get Logged in user details
   */
  public getUserByEmail(user: string): Observable<UserProfile> {
    const url = `${this.baseUrl}/${'user_profile'}`;
    return this.http.get<UserProfile>(url, { params: { email: user} });
  }

  /**
   * updateUserProfile method are use to update the user profile record using patch method
   * @param userProfile -
   */
  public updateUserProfile(userProfile: any): Observable<UserProfile> {
    const url = `${this.baseUrl}/${'user_profile'}/${userProfile.id}`;
    return this.http.patch<UserProfile>(url, userProfile);
  }

}
