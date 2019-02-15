/**
 * @author - Shahbaz Shaikh
 * @description - This module file are fetures module for payment.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// ------------------------------------------------- //
import { PaymentRoutingModule } from './payment-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { PaymentService } from './payment.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  declarations: [
    ViewComponent,
    AddComponent,
    DetailsComponent
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
