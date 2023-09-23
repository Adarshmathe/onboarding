import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/component/loader/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  loginData={
    userName:'',
    password:''
  };
  
  constructor(private snack:  MatSnackBar, private login:LoginService, private router:Router,  private userservice:UserService,  private loader: LoaderService) { }

  ngOnInit(): void {
  }

  formsubmit(){
    // console.log('login clk');
    if(this.loginData.userName.trim()=='' || this.loginData.userName==null){
      this.snack.open('Username is required','',{duration:3000});
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('password is required','',{duration:3000});
      return;
    }
    //request to generate token
    // console.log(this.loginData);
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setuser(user);
            // console.log(user);
            //redirect... admin/normal
            if(this.login.getUserRole()=="ADMIN"){
              // window.location.href='/admin';
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['admin']);

            }else if(this.login.getUserRole()=="USER"){
              // window.location.href='/user-dashboard';
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['user-dashboard']);

            }else{
              this.login.logout;
            }
          }
        );        
      },
      (error)=>{
        // console.log('Error');
  
        console.log(error);
        this.snack.open(error.error,'',{duration:3000,horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,})
        
      }
    )
  }


}
