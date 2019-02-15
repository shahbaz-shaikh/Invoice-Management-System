/**
 * @author Vaibhavi Prajapati
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// -----------------------------------------//
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';
/**
 * Routes for child component and its path
 */
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
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'add',
    component: AddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {}
