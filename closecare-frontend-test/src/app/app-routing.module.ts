import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisteredComponent } from './home/registered/registered.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'registered/:id',
    component: RegisteredComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
