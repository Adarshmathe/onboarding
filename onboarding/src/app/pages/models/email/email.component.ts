import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder, private emailService:EmailService,private toast: NgToastService){

  }
  email:FormGroup= this.fb.group({
   to:[this.data.email,[Validators.required]],
   subject:[''],
   message:['']
  })

  file:File = null;


  ngOnInit(): void {

  }

  onselectFile(e){
    // console.log(e.target.files[0]);
    if(e.target.files[0]){
      this.file = e.target.files[0];
    }

  }

  Submit(){
   this.emailService.sendEmail(this.email.value, this.file).subscribe(
    (data:any)=>{
      
      this.toast.success({detail:"SUCCESS",summary:data.body,duration:3000});
    },
    (error)=>{
      console.log(error);
      this.toast.error({detail:"Error",summary:error.message,duration:3000});
    }
   )
    
  }

}
