/**
 * @author Akshita Kapadia
 * apply routing for components and give it path
 * view component is default routed component
 *
 * add component use canDeactivate
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// ------------------------------------------------//
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view',
    pathMatch: 'full'
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'add',
    component: AddComponent,

  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
