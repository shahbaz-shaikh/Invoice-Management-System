import { CustomersService } from './customers.service';
/**
 * @author Vaibhavi Prajapati
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// ------------------------------------------//
import { ViewComponent } from './view/view.component';
import { SharedModule } from './../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule

  ],
  declarations: [ViewComponent, DetailComponent, AddComponent],
  providers: [CustomersService]
})
export class CustomersModule { }
