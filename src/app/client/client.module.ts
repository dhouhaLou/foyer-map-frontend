import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {SearchComponent} from './search/search.component';
import {ListAnnonceComponent} from './annonces/list-annonce/list-annonce.component';
import {AddAnnonceComponent} from './annonces/add-annonce/add-annonce.component';
import {EditAnnonceComponent} from './annonces/edit-annonce/edit-annonce.component';
import {ShowAnnonceComponent} from './annonces/show-annonce/show-annonce.component';
import {ShowFoyerComponent} from './foyers/show-foyer/show-foyer.component';
import {ListFoyerComponent} from './foyers/list-foyer/list-foyer.component';
import {ListAnnuaireComponent} from './annuaires/list-annuaire/list-annuaire.component';
import {ShowAnnuaireComponent} from './annuaires/show-annuaire/show-annuaire.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { UserAnnoncesComponent } from './annonces/user-annonces/user-annonces.component';


@NgModule({
  declarations: [HomeComponent, SearchComponent, ListAnnonceComponent, AddAnnonceComponent, EditAnnonceComponent, ShowAnnonceComponent, ShowFoyerComponent, ListFoyerComponent, ListAnnuaireComponent, ShowAnnuaireComponent, ProfileComponent, UserAnnoncesComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule {
}
