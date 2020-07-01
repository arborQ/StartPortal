import { IsAuthorizedGuard } from './../is-authorized.guard';
import { UsersListComponent } from './users-list/users-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'list', component: UsersListComponent, canActivate: [IsAuthorizedGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
