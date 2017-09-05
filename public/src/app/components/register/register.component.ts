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
      username: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateUser
      ])],
      email: ['',Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirmPassword: ['',Validators.required]
    },
    {
      validator: this.matchingPassword('password','confirmPassword')
    });
  }

  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)){
      return null;
    }else{ 
      return { 'validateEmail': true }
    }
  }

  validateUser(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return { 'validateUser': true }
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,35})/);
    if(regExp.test(controls.value)){
      return null;
    }else{
      return { 'validatePassword': true }
    }
  }

  matchingPassword(password, confirmPassword){
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirmPassword].value){
        return null;
      }else{
        return {'matchingPassword': true}
      }
    }
  }




  onRegisterSubmit(){
    console.log('done');
  }





  ngOnInit() {
  }

}
