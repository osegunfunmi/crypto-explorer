import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

registerUser(user){
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
  //   .map(res => res.json());
    return this.http.post('http://localhost:3000/users/register', JSON.stringify(user), {headers: headers}).map(res => res.json());
  }

  
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', JSON.stringify(user), {headers: headers}).map(res => res.json());
  }


  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

// return this.http.post(url, JSON.stringify(postdata), options).map(res => res.json());
