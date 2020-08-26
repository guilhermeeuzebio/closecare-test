import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { Employee } from 'src/app/shared/model/employee.model';
import { HomeService } from 'src/app/shared/service/home.service';
import { ValidatorCPF } from 'src/app/shared/validators/validator-cpf';
import { Constants } from '../shared/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  employee = new Employee();
  disabledButton: boolean = false;
  genders = Constants.GENDER;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      'first_name': new FormControl('' , Validators.required),
      'last_name': new FormControl(''),
      'gender': new FormControl('' , Validators.required),
      'birth_date': new FormControl(''),
      'CPF': new FormControl('', Validators.required)
    })
  }

  populate() {
    this.employee.first_name = this.registerForm.controls['first_name'].value;
    this.employee.last_name = this.registerForm.controls['last_name'].value;
    this.employee.gender = this.registerForm.controls['gender'].value;

    if (this.registerForm.controls['birth_date'].value) {
      // Put date in format expected by the API
      let birthDate = this.registerForm.controls['birth_date'].value;
      this.employee.birth_date = birthDate[4] + birthDate[5] + birthDate[6] + birthDate[7] + '-' +
          birthDate[2] + birthDate[3] + '-' + birthDate[0] + birthDate[1];
    } else {
      this.employee.birth_date = this.registerForm.controls['birth_date'].value;
    }
          
    this.employee.CPF = this.registerForm.controls['CPF'].value;
  }

  register() {
    this.disabledButton = true;
    this.populate()
    
    if (this.registerForm.invalid) {
      alertify.error('Os campos com asterisco(*) são de preenchimento obrigatório');
      this.disabledButton = false;
      return;
    }

    if (ValidatorCPF.validateCPF(this.employee.CPF)) {      
      this.homeService
      .postEmployee(this.employee)
      .subscribe(data => {              
        alertify.success('Funciońario cadastrado com sucesso.')
        this.router.navigate(['/registered', data.id])
      }, err => {
        this.disabledButton = false;
        alertify.error(err.error.error.message)
      })
    } else {
      alertify.error("CPF inválido");
      this.disabledButton = false;
      return;
    }
  }
}
