import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/model/employee.model';
import { HomeService } from 'src/app/shared/service/home.service';

@Component({
  selector: 'app-register',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit {
  employee = new Employee();
  text: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    let employeeId = this.route.snapshot.paramMap.get('id')
    
    this.homeService
      .getEmployee(employeeId)
      .subscribe(data => {
        this.employee = data
        this.createText();
      });
  }

  createText() {
    // Put mask in CPF
    this.employee.CPF = this.employee.CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    
    if (this.employee.birth_date && this.employee.birth_date !== 'None') {
      
      // Put date in Brazilian format
      var year = this.employee.birth_date.split('-')[0];
      var month = this.employee.birth_date.split('-')[1];
      var day =  this.employee.birth_date.split('-')[2];
      this.employee.birth_date = day + '/' + month + '/' + year

      this.text = `Eu, ${this.employee.first_name}, inscrito sob o CPF ${this.employee.CPF}, nascido em ${this.employee.birth_date}, declaro que li os Termos de Uso abaixo e concordo em compartilhar meus dados com as finalidades descritas.`
    } else {
      this.text = `Eu, ${this.employee.first_name}, inscrito sob o CPF ${this.employee.CPF}, declaro que li os Termos de Uso abaixo e concordo em compartilhar meus dados com as finalidades descritas.`
    }
  
  }

  back() {
    this.router.navigate([''])
  }


}
