import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UsersComponent} from './users/users.component';
import {AnnoncesComponent} from './annonces/annonces.component';
import {FoyersComponent} from './foyers/foyers.component';
import {AnnuairesComponent} from './annuaires/annuaires.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'users', component: UsersComponent},
  {path: 'annonces', component: AnnoncesComponent},
  {path: 'foyers', component: FoyersComponent},
  {path: 'annuaires', component: AnnuairesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
