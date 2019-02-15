/**
 * @author: Yamini Gala
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// --------------------------------------------------------
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ],
  declarations: [AddComponent, ViewComponent, DetailsComponent]
})
export class InvoicesModule { }
