import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  processing = false;

  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['',Validators.compose([
        Validators.required,
        this.validateEmail
      ])],
      password: ['',Validators.required]
    });
  }

  disableForm(){
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  enableForm(){
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }
  
  validateEmail(controls){
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(controls.value)){
      return null;
    }else{ 
      return { 'validateEmail': true }
    }
  }

  onLoginSubmit(){
    console.log('done');
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }
    this.authService.login(user).subscribe(data=>{
      // console.log(data);
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token,data.user);
      }
    });
  }

  ngOnInit() {
  }

}
