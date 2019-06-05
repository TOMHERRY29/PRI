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

    //public mail_adress: NgForm["value"];

    onLoggedin($scope) {
        console.log($scope.mail_enib);
        localStorage.setItem('isLoggedin', 'true');
        console.log(localStorage.setItem('isLoggedin', 'true'));
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        this.loginService.mail_adress = form.value;
        //export default mail_log;
        localStorage.setItem('isLoggedin', 'true');
        console.log(localStorage.getItem('isLoggedin'));
        this.router.navigate(['/layout/dashboard']);
    }
    
}
