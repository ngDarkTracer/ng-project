import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from "./form/form.component";
import {UserlistComponent} from "./userlist/userlist.component";

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'new', component: FormComponent },
  { path: 'list', component: UserlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
