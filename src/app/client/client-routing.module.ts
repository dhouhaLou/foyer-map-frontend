import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SearchComponent} from './search/search.component';
import {ShowFoyerComponent} from './foyers/show-foyer/show-foyer.component';
import {ShowAnnuaireComponent} from './annuaires/show-annuaire/show-annuaire.component';
import {ListFoyerComponent} from './foyers/list-foyer/list-foyer.component';
import {ShowAnnonceComponent} from './annonces/show-annonce/show-annonce.component';
import {ListAnnuaireComponent} from './annuaires/list-annuaire/list-annuaire.component';
import {EditAnnonceComponent} from './annonces/edit-annonce/edit-annonce.component';
import {AddAnnonceComponent} from './annonces/add-annonce/add-annonce.component';
import {ListAnnonceComponent} from './annonces/list-annonce/list-annonce.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {UserAnnoncesComponent} from './annonces/user-annonces/user-annonces.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search/:query/:ville', component: SearchComponent},

  {path: 'annonces', component: ListAnnonceComponent},
  {path: 'mes-annonces', component: UserAnnoncesComponent},
  {path: 'annonces/add', component: AddAnnonceComponent, canActivate: [AuthGuard]},
  {path: 'annonces/:id/edit', component: EditAnnonceComponent},
  {path: 'annonces/:id', component: ShowAnnonceComponent},

  {path: 'annuaire', component: ListAnnuaireComponent},
  {path: 'annuaire/:id', component: ShowAnnuaireComponent},

  {path: 'foyers', component: ListFoyerComponent},
  {path: 'foyers/:id', component: ShowFoyerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
