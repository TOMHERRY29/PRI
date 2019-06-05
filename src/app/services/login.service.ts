import { NgForm } from '@angular/forms';

export class LoginService {
    mail_adress: NgForm["value"];
    authorized: boolean = false;
    type: String;

    comptes = [
        {
            email: "toto@enib.fr",
            password: "test",
            type: "Eleve"
        },
        {
            email: "oussinc@enib.fr",
            password: "test",
            type: "Professeur"
        },
        {
            email: "lemagueresse@enib.fr",
            password: "test",
            type: "Administrateur"
        }
    ]

    getCompte(mail){

        var compteValide;
        this.authorized = false;
        for(let compte of this.comptes)
        {
            if(mail.email == compte.email){
                this.authorized = true;
                compteValide = compte;

            }
        }
        
        if(this.authorized == true)
        {
            this.type = compteValide.type;
            return compteValide;
        }
        else{
            return null;
        }
    }

}