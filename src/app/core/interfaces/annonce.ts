import {User} from './user';

export interface Annonce {
  id: number;
  titre: string;
  ville: string;
  tel: string;
  description: string;
  type_annonce: string;
  image: string;
  membre_id: string;
  membre: User;
}
