/**
 * @author - Shahbaz Shaikh
 * @description - This shared module are used for reusable Component, pipe and directives in application.
 */
import { NgModule } from '@angular/core';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ------------------------------------------- //
import { ItemDescriptionComponent } from './item-description/item-description.component';
import { CustomCurrencyPipe } from './custome-currency.pipe';
import { OrderByComponent } from './order-by/order-by.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { StatusDirective } from './table/status.directive';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    NgbModalModule
  ],
  declarations: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    StatusDirective,
    CustomCurrencyPipe
  ],
  exports: [
    ItemDescriptionComponent,
    OrderByComponent,
    PaginationComponent,
    SearchComponent,
    TableComponent,
    StatusDirective,
    CustomCurrencyPipe,
    ToastModule
  ]
})
export class SharedModule { }
