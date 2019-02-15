/**
 * @author - Ronak Patel.
 * @description - Create class for entry component.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';
// ------------------------------------------------ //
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { showSidebar: false }
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: { preloadingStrategy: PreloadingStrategy },
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    loadChildren: './user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'customer',
    loadChildren: './customers/customers.module#CustomersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: './products/products.module#ProductsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'quotation',
    loadChildren: './quotations/quotations.module#QuotationsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'invoice',
    loadChildren: './invoices/invoices.module#InvoicesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadChildren: './payment/payment.module#PaymentModule',
    canActivate: [AuthGuard]
  }
  ,
  {
    path: '**', redirectTo: 'login'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
