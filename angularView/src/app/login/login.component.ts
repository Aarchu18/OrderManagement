import { Component, OnInit } from '@angular/core';

import { FacebookLoginProvider, AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { FacebookService } from '../clients/shared/facebook.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private socialauthService: AuthService, private facebookService:FacebookService,private router:Router) { }
  public socialSignIn(socialPlateForm:string){
    let socialPlateFormProvider;
    if(socialPlateForm == "facebook"){
      socialPlateFormProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    else if(socialPlateForm == "google"){
      socialPlateFormProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialauthService.signIn(socialPlateFormProvider).then(
      // (userData)=>{
      //   console.log(socialPlateForm+ "sign in data: " ,userData);
      //   this.facebookService.setData(userData);
      //  // this.router.navigate(['/showDetail'])
      // }
      (userData) => {
        console.log(socialPlateForm + " sign in data : ", userData.name,userData);
        localStorage.setItem("Identity",userData.email);
        localStorage.setItem("id",userData.id);
        localStorage.setItem("name",userData.name);
        localStorage.setItem("image",userData.image);
        
        // Now sign-in with userDatauser
        // // ...
        // this.chatService.setData(userData);
        this.router.navigate(['/AddOrder']);
      }
    )

  }
  signUp(){
    this.router.navigate(['/ClientRegister']);

  }

  ngOnInit() {
  }

}
