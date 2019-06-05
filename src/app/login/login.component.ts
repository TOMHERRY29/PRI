import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    constructor(public router: Router, private loginService: LoginService) {
    }


    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        this.loginService.mail_adress = form.value;
        //export default mail_log;
        var compte = this.loginService.getCompte(this.loginService.mail_adress);
        if(compte != null)
        {
            console.log(compte);
            localStorage.setItem('isLoggedin', 'true');
    
            this.router.navigate(['/layout/dashboard']);
        }

    }
    
}
