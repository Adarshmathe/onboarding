import { Component, OnInit } from '@angular/core';
import { FormStatusService } from 'src/app/services/form-status.service';
import { LoginService } from 'src/app/services/login.service';
import { formstatus } from 'src/models/formStatus';
import { user } from 'src/models/user';


@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent implements OnInit {

  url:string;
  user : user
  public formStatusDetails : formstatus = new formstatus();
  constructor(private formstatusService:FormStatusService,private login:LoginService) {

   }

  ngOnInit(): void {
    this.url = "../../../../assets/pngegg.png";
    this.user = this.login.getuser();
    this.getFormStatus();

    this.formstatusService.formstatusSubject.asObservable().subscribe(
      (data)=>{
        this.getFormStatus();
      },
      (error)=>{
        console.log(error);
        
      }
    )

  }

  getFormStatus(){
    this.formstatusService.getformstate(this.user.id).subscribe(
      (data:any)=>{
        if(data!=null){
          this.formStatusDetails = data;
        }
        
      },
        (error)=>{
          console.log(error);
        }
        )
  }

}
