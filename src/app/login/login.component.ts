import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(public router: Router) {}

    ngOnInit() {}

    public mail_adress: NgForm["value"];

    onLoggedin($scope) {
        console.log($scope.mail_enib);
        localStorage.setItem('isLoggedin', 'true');
        console.log(localStorage.setItem('isLoggedin', 'true'));
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        var mail_log = form.value;
        //export default mail_log;
        localStorage.setItem('isLoggedin', 'true');
        console.log(localStorage.getItem('isLoggedin'));
        this.router.navigate(['/dashboard']);
    }
}
