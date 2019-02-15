/**
 * @author - Ronak Patel.
 * @description - Create for user canActived or not.
 * AuthGuard class implements CanActive interface and their method.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
// ---------------------------------------------------------------------------------------------------------//
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    // Inject Router and AuthService.

    constructor(private router: Router, private service: AuthService) { }
    /**
     * Create for chack user token is null or not and return some value in boolean type.
     * @param next - implement for ActivatedRouterSnapshot.
     * @param state - implement for RouterStateSnapshot.
     */
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        if (localStorage.getItem('token') != null) {
            return true;
        } else {
            // this.router.navigate(['login']);
            alert('Your are not authenticate without login');
            return false;
        }

    }


}
