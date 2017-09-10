import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';

@Injectable()
export class BlogService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthenticationHeader(){
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  newBlog(blog){
    this.createAuthenticationHeader();
    return this.http.post(this.domain+'blogs/newBlog', blog, this.options).map(res=>res.json());
  }

  getAllBlogs(){
    this.createAuthenticationHeader();
    return this.http.get(this.domain+'blogs/allBlogs',this.options).map(res=>res.json());
  }
}