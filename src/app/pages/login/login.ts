import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj:any={
    userName:'',
    password:''
  };

  router=inject(Router);

  onLogin(){
    if(this.loginObj.userName=='admin' && this.loginObj.password=='1234'){
           this.router.navigateByUrl("/dashboard")
    }
    else{
      alert("Enter Correct Credentials")
    }
  }
}
