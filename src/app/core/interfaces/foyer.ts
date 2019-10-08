import {User} from './user';

export interface Foyer {
  id: number;
  titre: string;
  adresse: string;
  ville: string;
  nb_chmbr: string;
  prix_indiv: string;
  prix2: string;
  prix3: string;
  membre_id: string;
  membre: User;
}
