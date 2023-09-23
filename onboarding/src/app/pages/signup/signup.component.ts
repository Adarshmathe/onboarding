import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { AppValidation } from 'src/app/services/validation';
import { Role, user } from 'src/models/user';
import { NgToastService } from 'ng-angular-popup';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private login: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private toast: NgToastService
  ) {}

  roles: Role[];
  userdata: user;
  readonly: boolean = false;
  private validation = new AppValidation();
  user: FormGroup = this.fb.group({
    id: '',
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required]],
    role: ['', [Validators.required]],
    enabled: '',
    createdOn: '',
  });

  status: boolean = false;

  ngOnInit(): void {
    this.roles = [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'USER' },
    ];

    if (this.data.id != null) {
      this.empById(this.data.id);
      this.isDisabled();
    }
  }
  isDisabled() {
    this.readonly = true;
  }

  formsubmit() {
    if (this.user.value.id == '') {
      //add date
      this.user.patchValue({
        createdOn: new Date()
      })
      this.userservice.addUser(this.user.value).subscribe(
        (data: user) => {
          // console.log('save new user=>>' + data);
          this.status = true;
          // this.form_reset();
      
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'user saved',
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.toast.error({
            detail: 'Error',
            summary: error.error,
            duration: 3000,
          });
        }
      );
    } else {
      this.userservice.updateUser(this.user.value).subscribe(
        (data: user) => {
          // console.log('update new user=>>' + data);
          this.status = true;
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'user updated',
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.toast.error({
            detail: 'Error',
            summary: error.error,
            duration: 3000,
          });
        }
      );
    }
  }


  empById(id) {
    this.userservice.getuserbyid(id).subscribe(
      (data: user) => {
        // console.log(data);
        this.userdata = data;
        this.initializeForm();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initializeForm() {
    this.user.patchValue({
      id: this.userdata.id,
      name: this.userdata.name,
      password: this.userdata.password,
      email: this.userdata.email,
      mobile: this.userdata.mobile,
      role: this.userdata.role,
      enabled: this.userdata.enabled,
      createdOn: this.userdata.createdOn
    });
  }
  _keyPress(event: any) {
    this.validation.allowedNumberOnly(event);
  }

  // form_reset(){
  //   this.user.patchValue({
  //     id:'',
  //     name: '',
  //     password:'',
  //     email: '',
  //     mobile: '',
  //     role: '',
  //     enabled: '',
  //     createdOn: '',
  //   })

  // }
}
