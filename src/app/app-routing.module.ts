import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FlatsComponent } from './flats/flats.component';

const routes: Routes = [
  {
    path: '',
    component:HomepageComponent
  },
{
  path:'user/:id',
  component: UserComponent
},
{
  path:'flats',
  component:FlatsComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
