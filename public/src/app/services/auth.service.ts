import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080/"
  authToken;
  user;
  options;
  constructor(
    private http: Http
  ) { }

  registerUser(user){
    return this.http.post(this.domain+'authentication/register',user).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get(this.domain+'authentication/checkEmail/'+email).map(res=>res.json());
  }

  checkUsername(username){
    return this.http.get(this.domain+'authentication/checkUsername/'+username).map(res=>res.json());
  }

  login(user){
    return this.http.post(this.domain+'authentication/login',user).map(res=>res.json());
  }

  storeUserData(token, user){
    // setItem(key,data)
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = token;
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }

  createAuthenticationHeader(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  getProfile(){
    this.createAuthenticationHeader();
    console.log(this.options);
    // return this.http.get(this.domain+'/authentication/profile', this.options).map(res=>res.json());
    return this.http.get(this.domain+'authentication/profile', this.options).map(res=>res.json());
  }

}
