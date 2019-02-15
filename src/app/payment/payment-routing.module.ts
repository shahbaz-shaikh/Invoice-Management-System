/**
 * @author - Shahbaz Shaikh
 * @description - This routing file are set the all routes for payment Component.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// -------------------------------------------------- //
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';

/**
 * This route of payment child Routes.
 */
const paymentRoutes: Routes = [
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full'
  },
  {
    path: 'view',
    component: ViewComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'add',
    component: AddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(paymentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PaymentRoutingModule { }
