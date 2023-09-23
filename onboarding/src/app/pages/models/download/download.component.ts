import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankdetailsService } from 'src/app/services/bankdetails.service';
import { DownloadfilesService } from 'src/app/services/downloadfiles.service';
import { EducationDetailsService } from 'src/app/services/education-details.service';
import { ExperienceDetailsService } from 'src/app/services/experience-details.service';
import { FamilyService } from 'src/app/services/family.service';
import { PersonaldetailsService } from 'src/app/services/personaldetails.service';
import { PfdetailsService } from 'src/app/services/pfdetails.service';
import { PersonalDetails } from 'src/models/personalDetails';

import { FileSaverService } from 'ngx-filesaver';
import { bank } from 'src/models/bankDetails';
import { education } from 'src/models/educationDetails';
import { family } from 'src/models/familyDetils';
import { experience } from 'src/models/experiansDetails';
import { modeldata } from 'src/models/utils';
import { LoaderService } from 'src/app/component/loader/loader.service';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {
  isChecked: boolean = false;
  userId: Number;
  PersonalDetails: PersonalDetails = new PersonalDetails();
  BankDetails: bank = new bank();
  EducationDetails: education = new education();
  FamilyDetails: family = new family();
  ExperienceDetails: experience = new experience();

  constructor(
    private downloadservice: DownloadfilesService,
    private filesaver: FileSaverService,
    private personaldetailsService: PersonaldetailsService,
    @Inject(MAT_DIALOG_DATA) public data: modeldata,
    private bankService: BankdetailsService,
    private educationService: EducationDetailsService,
    private educationservice: EducationDetailsService,
    private familyservice: FamilyService,
    private Expservice: ExperienceDetailsService,
    private pfservice: PfdetailsService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.userId = this.data.id;
    this.getPersonalDeatils();
    this.getBankDetails();
    this.getdetailsofeducation();
    this.getFamilyDetails();
    this.getExperiencedetails();
  }
  idarray: string[];

  task: Task = {
    name: 'Select All',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Personal Details', completed: false, color: 'primary' },
      { name: 'Bank Details', completed: false, color: 'primary' },
      { name: 'Education Details', completed: false, color: 'primary' },
      { name: 'Family Details', completed: false, color: 'primary' },
      { name: 'Experience Details', completed: false, color: 'primary' },
      { name: 'Provident Fund', completed: false, color: 'primary' },
      { name: 'Gratuity', completed: false, color: 'primary' },
      {
        name: 'EMPLOYEE CONFIDENTIALITY AGREEMENT',
        completed: false,
        color: 'primary',
      },
      { name: 'ZFHL GROUP MEDICLAIM', completed: false, color: 'primary' },
      {
        name: 'Declaration and Nomination Form',
        completed: false,
        color: 'primary',
      },
      {
        name: 'Group Personal Accident Insurance',
        completed: false,
        color: 'primary',
      },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }

    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  getPersonalDeatils() {
    this.loader.start();
    this.personaldetailsService.get(this.userId).subscribe(
      (data: PersonalDetails) => {
        this.loader.stop();
        this.PersonalDetails = data;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  getExperiencedetails() {
    this.loader.start();
    this.Expservice.getdetailsofuser(this.userId).subscribe(

      (data: experience) => {
        this.loader.stop();
        this.ExperienceDetails = data;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  getdetailsofeducation() {
    this.loader.start();
    this.educationservice.getdetailsofeducation(this.userId).subscribe(
      (data: education) => {
        this.loader.stop();
        this.EducationDetails = data;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }
  getFamilyDetails() {
    this.loader.start();
    this.familyservice.getfamilydetailsbyuser(this.userId).subscribe(
      (data: family) => {
        this.loader.stop();
        this.FamilyDetails = data;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  getBankDetails() {
    this.loader.start();
    this.bankService.getbankdetails(this.userId).subscribe(
      (data: bank) => {
        this.loader.stop();
        this.BankDetails = data;
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }

  download() {
    this.loader.start();
    this.downloadservice.getFiles(this.userId).subscribe(
      (res: any) => {
        this.loader.stop();
        this.filesaver.save(res.body, 'file.zip');
      },
      (error) => {
        this.loader.stop();
        console.log(error);
      }
    );
  }
}
