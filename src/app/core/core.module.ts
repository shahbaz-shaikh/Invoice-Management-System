/**
 * @author - Ronak Patel.
 * @description - Create for single instance.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// --------------------------------------------------------------------------------------------------------//
import { FooterComponent } from './footer/footer.component';
import { NavbarModule } from './navbar/navbar.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    NavbarModule,
    AuthModule
  ],
  declarations: [FooterComponent],
  providers: [AuthService, AuthGuard],
  exports: [NavbarModule,
    FooterComponent],
})
export class CoreModule { }
