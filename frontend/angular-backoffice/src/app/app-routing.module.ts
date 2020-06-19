import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'authorize', loadChildren: () => import('./authorize/authorize.module').then(m => m.AuthorizeModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule, MatSidenavModule, MatListModule]
})
export class AppRoutingModule { }
