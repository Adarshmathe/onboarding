import { LocationStrategy } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { delay, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel,
} from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { PersonaldetailsmodelComponent } from '../models/personaldetailsmodel/personaldetailsmodel.component';
import { EducationdetailsmodelComponent } from '../models/educationdetailsmodel/educationdetailsmodel.component';
import { ExperiencedetailsmodelComponent } from '../models/experiencedetailsmodel/experiencedetailsmodel.component';
import { BankdetailsmodelComponent } from '../models/bankdetailsmodel/bankdetailsmodel.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { DownloadComponent } from '../models/download/download.component';
import { ProvidentFunddetailsmodelComponent } from '../models/provident-funddetailsmodel/provident-funddetailsmodel.component';
import { GrauiitymodelComponent } from '../models/grauiitymodel/grauiitymodel.component';
import { EmployeeconfidentialadreementModelComponent } from '../models/employeeconfidentialadreement-model/employeeconfidentialadreement-model.component';
import { GroupterminsuranceModelComponent } from '../models/groupterminsurance-model/groupterminsurance-model.component';
import { GroupmediclaimmodelComponent } from '../models/groupmediclaimmodel/groupmediclaimmodel.component';
import { NominationinpfModelComponent } from '../models/nominationinpf-model/nominationinpf-model.component';
import { CodeofconductModelComponent } from '../models/codeofconduct-model/codeofconduct-model.component';
import { codeofconducturl } from 'src/app/services/helper';
import { FamilymodelComponent } from '../models/familymodel/familymodel.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertBoxServiceService } from 'src/app/component/nav-bar/alert-box/alert-box-service.service';
import { ModalModel } from 'src/app/component/nav-bar/alert-box/alert-box.modal';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertBoxComponent } from 'src/app/component/nav-bar/alert-box/alert-box.component';
import { NgToastService } from 'ng-angular-popup';
import { EmailComponent } from '../models/email/email.component';
import { user } from 'src/models/user';
import { LoaderService } from 'src/app/component/loader/loader.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  // @ViewChild('resetModal') modal: ElementRef;
  employee: user[] = [];
  closeResult: string;
  // employeeByid:any;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'role',
    'Status',
    'CreatedOn',
    'projectGear',
  ];
  // users=[];
  dataSource: MatTableDataSource<user>;
  dataChanged$: Subscription | undefined;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('input') input!: ElementRef;
  resultsLength = 25;

  constructor(
    private location: LocationStrategy,
    public dialog: MatDialog,
    private userservice: UserService,
    private snack: MatSnackBar,
    private modalService: NgbModal,
    private modalService1: AlertBoxServiceService,
    private modalService2: AlertBoxServiceService,
    private toast: NgToastService,
    private loader: LoaderService
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    this.dataSource = new MatTableDataSource();
  }

  dates = {
    start: new Date(),
    end: new Date(),
  };

  search() {
    this.loader.start();
    this.userservice.getusersByDate(this.dates).subscribe(
      (resp: user[]) => {
        this.loader.stop();
        this.employee = resp;
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  getUserList(): void {
    this.loader.start();
    this.userservice.getalluser().subscribe((resp: user[]) => {
      this.loader.stop();
      this.employee = resp;
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteuser(id) {
    this.loader.start();
    this.userservice.deleteuser(id).subscribe(
      (data: user) => {
        this.loader.stop();
        // console.log(data);
        this.ngOnInit();
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getUserList();
  }

  //add new user
  openDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '700px',
      data: { title: 'ADD' },
    });

    dialogRef.afterClosed().subscribe((result) => {
     
        this.userservice
          .getalluser()
          .subscribe(
            (data: any) => {
              // console.log(data);
              this.employee = data;
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            (error) => {
              console.log(error);
            }
          );
   
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //update new user
  openDialog1(id) {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '700px',
      data: { id: id, title: 'Edit' },
    });
    dialogRef.afterClosed().subscribe((res) => {
    
        this.userservice
          .getalluser()
          .subscribe(
            (data: user[]) => {
              // console.log(data);
              this.employee = data;
              this.dataSource = new MatTableDataSource(data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },
            (error) => {
              console.log(error);
            }
          );
    
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  openDialog2(id) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == 'Yes') {
        this.deleteuser(id);
      }
    });
  }
  sendEmail(email) {
    const dialogRef = this.dialog.open(EmailComponent, {
      width: '1000px',
      data: { email: email, title: 'send Email' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  downloadDialog(id) {
    const dialogRef = this.dialog.open(DownloadComponent, {
      width: '1400px',
      data: { id: id, title: 'Edit' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  personalDetailsdialog(id) {
    const dialogRef = this.dialog.open(PersonaldetailsmodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      
    });
  }
  educationDetailsdialog(id) {
    const dialogRef = this.dialog.open(EducationdetailsmodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
  experienceDetailsdialog(id) {
    const dialogRef = this.dialog.open(ExperiencedetailsmodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  bankDetailsdialog(id) {
    const dialogRef = this.dialog.open(BankdetailsmodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  providentFunddialog(id) {
    const dialogRef = this.dialog.open(ProvidentFunddetailsmodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  gratuitydialog(id) {
    const dialogRef = this.dialog.open(GrauiitymodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  employeeconfidentialdialog(id) {
    const dialogRef = this.dialog.open(
      EmployeeconfidentialadreementModelComponent,
      {
        width: '1400px',
        data: { id: id, title: 'View' },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {});
  }

  mediclaimdialog(id) {
    const dialogRef = this.dialog.open(GroupmediclaimmodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  insurancedialog(id) {
    const dialogRef = this.dialog.open(GroupterminsuranceModelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  nominationdialog(id) {
    const dialogRef = this.dialog.open(NominationinpfModelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
  familyDetailsdialog(id) {
    const dialogRef = this.dialog.open(FamilymodelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  cocdialog(id) {
    const dialogRef = this.dialog.open(CodeofconductModelComponent, {
      width: '1400px',
      data: { id: id, title: 'View' },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  newpassword = {
    password: '',
    id: '',
  };

  reset(content, id) {
    this.newpassword.id = id;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;

          if (this.newpassword.password) {
            this.userservice.newpassword(this.newpassword).subscribe(
              (res: user) => {
                this.toast.success({
                  detail: 'SUCCESS',
                  summary: 'Password Changed',
                  duration: 3000,
                });
                this.newpassword.id = '';
                this.newpassword.password = '';
                //  this.snack.open('password changed','',{duration:3000});
              },
              (error) => {
                console.log(error);
                this.toast.error({
                  detail: 'Error',
                  summary: error.message,
                  duration: 3000,
                });

                this.newpassword.id = '';
                this.newpassword.password = '';
                // this.snack.open('password not changed','',{duration:3000});
              }
            );
          }
        },
        (reason) => {
          this.newpassword.id = '';
          this.newpassword.password = '';
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  // async reset(id){
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
  //       (res)=>{
  //          console.log(res);
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

  Status: { status: boolean; id: Number } = {
    status: null,
    id: null,
  };

  changeStatus(id) {
    var s = this.employee.filter((e) => e.id == id).map((e) => e.enabled);

    this.Status.status = s[0] ? false : true;
    this.Status.id = id;

    this.userservice.changeStatus(this.Status).subscribe(
      (data: user) => {
        // console.log(data);
        if (data.enabled) {
          // this.snack.open('User Unblocked','',{duration:3000});
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'User Unblocked',
            duration: 3000,
          });
        } else {
          // this.snack.open('User Blocked','',{duration:3000});
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'User Blocked',
            duration: 3000,
          });
        }
        this.getUserList();
      },
      (error) => {
        console.log(error);
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }
}
