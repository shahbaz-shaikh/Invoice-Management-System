/**
 * @author Sonal Prajapati
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// -------------------------------//
import { QuotationRoutingModule } from './quotations-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { QuotationService } from './quotation.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    QuotationRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [ViewComponent, AddComponent, DetailsComponent],
  providers: [QuotationService]
})
export class QuotationsModule { }
