/**
 * @author - Shahbaz Shaikh
 * @description - Create class  for user profile module.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// ------------------------------------------------ //
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileService } from './user-profile.service';
import { PasswordDirective } from './password.directive';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserProfileComponent,
    PasswordDirective
  ],
  exports: [
    PasswordDirective
  ],
  providers: [
    UserProfileService
  ]
})
export class UserProfileModule { }
