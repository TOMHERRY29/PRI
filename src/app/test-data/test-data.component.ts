import { Component, OnInit } from '@angular/core';
import { StagiairesService } from '../services/stagiaires.service';
import { Stagiaire } from '../models/stagiaire.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.scss']
})
export class TestDataComponent implements OnInit {
  stagiaires: Stagiaire[] = [];
  private stagiaireSub: Subscription;
  userForm: FormGroup;

  constructor(public stagiairesService: StagiairesService) {


  }

  ngOnInit() {
  }

 /*  onSubmitForm() {
    const formValue = this.userForm.value;
    this.stagiairesService.addStagiaire(formValue['idStagiaire'],
      formValue['Nom'],
      formValue['Prenom']);
  }
 */
  onAddNode(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.stagiairesService.addStagiaire(
      form.value.idStagiaire,
      form.value.Nom,
      form.value.Prenom
    );
  }
  // form.resetForm();
}




