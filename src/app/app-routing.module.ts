import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { FormEditorComponent } from './form-editor/form-editor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'editform', pathMatch: 'full', redirectTo: 'editform/' },
  { path: 'editform/:id', component: FormEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
