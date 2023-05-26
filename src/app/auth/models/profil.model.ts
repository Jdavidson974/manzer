import { Secteur } from "src/app/home/models/secteur.model";

export class Profil {
    id!: number;
    username!: string;
    email!: string;
    picture!: string;
    secteur !: Secteur
}