import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { FamilyService } from 'src/app/services/family.service';
import { FormStatusService } from 'src/app/services/form-status.service';
import { extra, family } from 'src/models/familyDetils';
import { formstatus } from 'src/models/formStatus';
import { modeldata } from 'src/models/utils';

@Component({
  selector: 'app-familymodel',
  templateUrl: './familymodel.component.html',
  styleUrls: ['./familymodel.component.css'],
})
export class FamilymodelComponent implements OnInit {
  formStatusdetails: formstatus = new formstatus();
  checkbox: boolean = false;
  disable: boolean = false;
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'relation',
    'dob',
    'gender',
  ];
  dataSource: MatTableDataSource<extra>;

  constructor(
    private FamilyService: FamilyService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private snack: MatSnackBar,
    private formstatusservice: FormStatusService,
    private toast: NgToastService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getdetailsofFamily(this.data.id);
    this.getFormStatus(this.data.id);
  }

  getFormStatus(id) {
    this.formstatusservice.getformstate(id).subscribe(
      (data: formstatus) => {
        if (data != null) {
          this.initialization(data);
          if (this.formStatusdetails.family == '1') {
            this.checkbox = true;
          } else if (this.formStatusdetails.family == '2') {
            this.checkbox = false;
          } else {
            this.disable = true;
          }
        }else {
          this.disable = true;
        }
      },
      (error) => {
        console.log(error);
        this.disable = true;
      }
    );
  }

  initialization(data: formstatus) {
    this.formStatusdetails = {
      id: data.id,
      personal: data.personal,
      family: data.family,
      education: data.education,

      experience: data.experience,
      bank: data.bank,
      provident: data.provident,
      gratuity: data.gratuity,
      employeeConfidentialityAgreement: data.employeeConfidentialityAgreement,
      groupMediclaim: data.groupMediclaim,
      groupTermInsurance: data.groupTermInsurance,
      nominationinPF: data.nominationinPF,
      codeOfConduct: data.codeOfConduct,
      formuser: { id: data.formuser.id },
    };
  }

  updateformstatus() {
    if (this.checkbox == true) {
      this.formStatusdetails.family = '1';
    } else {
      this.formStatusdetails.family = '2';
    }

    this.formstatusservice.updateformstate(this.formStatusdetails).subscribe(
      (data:formstatus) => {
        // this.snack.open('SUCCESS','',{duration:3000,horizontalPosition: 'center',
        // verticalPosition: 'top'});
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'saved',
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
        // this.snack.open('ERROR',error.message,{duration:3000,horizontalPosition: 'center',
        // verticalPosition: 'top'})
        this.toast.error({
          detail: 'Error',
          summary: error.message,
          duration: 3000,
        });
      }
    );
  }

  getdetailsofFamily(id) {
    this.FamilyService.getfamilydetailsbyuser(id).subscribe(
      (data: family) => {
        this.dataSource = new MatTableDataSource(data.extras);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
