import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
   }

  createForm(){
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    });
  }

  onRegisterSubmit(){
    console.log('done');
  }





  ngOnInit() {
  }

}
