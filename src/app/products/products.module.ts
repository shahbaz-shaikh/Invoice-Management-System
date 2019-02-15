import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


// -------------------------------------------------------------------//

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailsComponent } from './details/details.component';
import { AddComponent } from './add/add.component';
import { ProductsService } from './products.service';
import { EditComponent } from './edit/edit.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsRoutingModule,

  ],
  providers: [ProductsService, DatePipe],
  declarations: [ViewComponent, DetailsComponent, AddComponent, EditComponent]


})
export class ProductsModule { }
