import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FileUploadServiceService } from 'src/app/services/file-upload-service.service';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/models/user';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {

  // url = "../../../assets/Employee-Onboarding.png";
 
url:string = "";
  public userdata:user ;
  selectedFiles?: FileList;
  // selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  // previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data:modeldata,private userservice: UserService,private uploadService: FileUploadServiceService) { }

  ngOnInit(): void {
   
    this.getuser(this.data.id);
    // this.imageInfos = this.uploadService.getFiles();
  }


 

  // selectFiles(event: any): void {
  //   this.message = [];
  //   this.progressInfos = [];
  //   this.selectedFileNames = [];
  //   this.selectedFiles = event.target.files;

  //   this.previews = [];
  //   if (this.selectedFiles && this.selectedFiles[0]) {
  //     const numberOfFiles = this.selectedFiles.length;
  //     for (let i = 0; i < numberOfFiles; i++) {
  //       const reader = new FileReader();

  //       reader.onload = (e: any) => {
  //         console.log(e.target.result);
  //         this.previews.push(e.target.result);
  //       };

  //       reader.readAsDataURL(this.selectedFiles[i]);

  //       this.selectedFileNames.push(this.selectedFiles[i].name);
  //     }
  //   }
  // }

  upload(idx: number, file: File): void {

   const id = this.userdata.id;

    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    if (file) {

      this.uploadService.upload(id,file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            // this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  getuser(id){
    this.userservice.getuserbyid(id).subscribe(
      (data:user)=>{
        this.userdata = data;
        this.url = "http://localhost:1998/image/images/"+ this.userdata.image;
      },
        (error)=>{
          console.log(error);
        }
        )
  }

  onselectFile(e){
  
    if(e.target.files){
      this.selectedFiles = e.target.files;
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= (event:any)=>{
        this.url = event.target.result;
        this.uploadFiles();
      }
    }

  }
  

}
