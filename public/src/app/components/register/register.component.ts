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
        Validators.maxLength(30)
      ])],
      email: ['',Validators.required],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(35)
      ])],
      confirmPassword: ['',Validators.required]
    }
    // {
    //   validator: this.matchingPassword('password','confirm')
    // });
  }

  // matchingPassword(password, confirm){
  //   return (group: FormGroup) => {
  //     if(group.controls[password].value === group.controls[confirm].value){
  //       return null;
  //     }else{
  //       return {'matchingPassword': true}
  //     }
  //   }
  // }


  onRegisterSubmit(){
    console.log('done');
  }





  ngOnInit() {
  }

}
