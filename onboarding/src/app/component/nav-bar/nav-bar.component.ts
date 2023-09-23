import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ViewprofileComponent } from 'src/app/pages/models/viewprofile/viewprofile.component';
import { profileimageurl } from 'src/app/services/helper';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/models/user';
import { NavBarService } from './nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  closeResult: string;
  isLoggedIn = false;
  user: user = null;
  url: string = '';
  userdata: user;
  istoggle: boolean = true;
  constructor(
    public login: LoginService,
    private router: Router,
    private userservice: UserService,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private toast: NgToastService,
    private navService: NavBarService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedin();
    this.user = this.login.getuser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedin();
      this.user = this.login.getuser();
    });
    this.getuser(this.user.id);
  }

  public logout() {
    this.login.logout();
    // window.location.reload();
    this.router.navigate(['/login']);
  }

  newpassword = {
    password: '',
    id: '',
  };

  reset(content) {
    let user = this.login.getuser();
    this.newpassword.id = user.id;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;

          if (this.newpassword.password) {
            this.userservice.newpassword(this.newpassword).subscribe(
              (res: user) => {
                // this.toast.success({
                //   detail: 'SUCCESS',
                //   summary: 'Password Changed',
                //   duration: 3000,
                // });
                this.newpassword.id = '';
                this.newpassword.password = '';
                this.snack.open('password changed', '', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              },
              (error) => {
                // console.log(error);
                // this.toast.error({
                //   detail: 'Error',
                //   summary: error.message,
                //   duration: 3000,
                // });

                this.newpassword.id = '';
                this.newpassword.password = '';
                this.snack.open('password not changed', error.message, {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }
            );
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.newpassword.id = '';
          this.newpassword.password = '';
        }
      );
    // this.modal.open();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.newpassword.id = '';
      this.newpassword.password = '';
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.newpassword.id = '';
      this.newpassword.password = '';
      return 'by clicking on a backdrop';
    } else {
      this.newpassword.id = '';
      this.newpassword.password = '';
      return `with: ${reason}`;
    }
  }

  // newpassword={
  //   password:'',
  //   id:''
  // }

  // async reset(){
  //   let user = this.login.getuser();
  //   let id = user.id;

  //   const { value: password } = await Swal.fire({
  //     title: 'Enter New password',
  //     input: 'password',
  //     inputLabel: 'Password',
  //     inputPlaceholder: 'Enter New password',
  //   })

  //   if (password) {
  //     this.newpassword.id=id;
  //     this.newpassword.password=password;
  //     this.userservice.newpassword(this.newpassword).subscribe(
  //       (res:user)=>{
  //         //  console.log(res);
  //          this.snack.open('password changed','',{duration:3000});
  //       },
  //       (error)=>{
  //         console.log("error");
  //         this.snack.open('password not changed','',{duration:3000});
  //         console.log(error);

  //       }
  //     )
  //   }
  //  }

  viewprofiledialog1() {
    const id = this.user.id;

    const dialogRef = this.dialog.open(ViewprofileComponent, {
      width: '500px',
      data: { id: id, title: 'Edit' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
  }

  getuser(id) {
    this.userservice.getuserbyid(id).subscribe(
      (data: user) => {
        // console.log(data);
        this.userdata = data;
        this.url = profileimageurl + this.userdata.image;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggle() {
    this.istoggle = !this.istoggle;

    this.navService.navbar_subject.next(this.istoggle);
  }
}
