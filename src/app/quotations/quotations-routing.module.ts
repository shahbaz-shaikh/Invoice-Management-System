/**
 * @author Sonal Prajapati
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// -----------------------------//
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
/**
 *  route to the url
 */
const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  { path: 'view', component: ViewComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit/:id', component: AddComponent },
  { path: 'details', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
