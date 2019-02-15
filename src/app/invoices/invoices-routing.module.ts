/**
 * @author: Yamini Gala
 */
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//--------------------------------------------------------------
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
/**
 * applied routing that will route to the url
 */
const routes: Routes = [
  {
    path:'',
    redirectTo:'view',
    pathMatch:'full'
  },
  {
    path: 'view', component:ViewComponent
  },
  {
    path: 'add' , component:AddComponent
  },
  {
    path: 'details', component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
