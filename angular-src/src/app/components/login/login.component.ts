import { RouterTestingModule } from '@angular/router/testing';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

   
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

onLoginSubmit(){
  const user = {
    username: this.username,
    password: this.password
  }
  // console.log(this.username);
  this.authService.authenticateUser(user).subscribe(data => {
    // console.log(data);
    if(data.success){
      this.authService.storeUserData(data.token, data.user);
      this.flashMessage.show('You are now logged in', {
        cssClass: 'alert-success',
        timeout: 5000});  
      this.router.navigate(['/dashboard']);
    }else{
      this.flashMessage.show(data.msg, {
        cssClass: 'alert-danger',
        timeout: 5000});  
      this.router.navigate(['/login']);
    }
  });
  }
}
