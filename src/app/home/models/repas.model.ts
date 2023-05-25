import { Profil } from "src/app/auth/models/profil.model";

export class Repas {
    id!: number;

    name!: string

    tag!: string

    img!: string

    user!: Profil

}