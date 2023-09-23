import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './pages/admin/admin.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './pages/adminComponents/sidebar/sidebar.component';
import { UsersidebarComponent } from './pages/userComponents/usersidebar/usersidebar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { authInterceptorProviders } from './services/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { PersonaldetailsComponent } from './pages/userComponents/personaldetails/personaldetails.component';
import { EducationComponent } from './pages/userComponents/education/education.component';
import { ExperienceComponent } from './pages/userComponents/experience/experience.component';
import { BankComponent } from './pages/userComponents/bank/bank.component';
import { ProvidentFundComponent } from './pages/userComponents/provident-fund/provident-fund.component';
// import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from "ngx-ui-loader";
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { PersonaldetailsmodelComponent } from './pages/models/personaldetailsmodel/personaldetailsmodel.component';
import { EducationdetailsmodelComponent } from './pages/models/educationdetailsmodel/educationdetailsmodel.component';
import { ExperiencedetailsmodelComponent } from './pages/models/experiencedetailsmodel/experiencedetailsmodel.component';
import { BankdetailsmodelComponent } from './pages/models/bankdetailsmodel/bankdetailsmodel.component';
import { ProvidentFunddetailsmodelComponent } from './pages/models/provident-funddetailsmodel/provident-funddetailsmodel.component';
import { ViewprofileComponent } from './pages/models/viewprofile/viewprofile.component';
import { GratuityComponent } from './pages/userComponents/gratuity/gratuity.component';
import { CodeOfConductComponent } from './pages/userComponents/code-of-conduct/code-of-conduct.component';
import { EmployeeConfidentialAgreementComponent } from './pages/userComponents/employee-confidential-agreement/employee-confidential-agreement.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { FamilyDetailsComponent } from './pages/userComponents/family-details/family-details.component';
import { DownloadComponent } from './pages/models/download/download.component';
import {NgxPrintModule} from 'ngx-print';
import { MediclamComponent } from './pages/userComponents/mediclam/mediclam.component';
import { GroupTermInsuranceComponent } from './pages/userComponents/group-term-insurance/group-term-insurance.component';
import { NominationInPfComponent } from './pages/userComponents/nomination-in-pf/nomination-in-pf.component';
import { FilterPipe } from './filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { PFformDownloadComponent } from './pages/models/download/pfform-download/pfform-download.component';
import { GratuityDownloadComponent } from './pages/models/download/gratuity-download/gratuity-download.component';
import { GroupMediclaimDownloadComponent } from './pages/models/download/group-mediclaim-download/group-mediclaim-download.component';
import { GroupTeramInsuranceDownloadComponent } from './pages/models/download/group-teram-insurance-download/group-teram-insurance-download.component';
import { NominationInPfDownloadComponent } from './pages/models/download/nomination-in-pf-download/nomination-in-pf-download.component';
import { EmployeeConfidentialAgreementDownloadComponent } from './pages/models/download/employee-confidential-agreement-download/employee-confidential-agreement-download.component';
import { DatePipe } from '@angular/common';
import { FileSaverModule } from 'ngx-filesaver';
import { GrauiitymodelComponent } from './pages/models/grauiitymodel/grauiitymodel.component';
import { EmployeeconfidentialadreementModelComponent } from './pages/models/employeeconfidentialadreement-model/employeeconfidentialadreement-model.component';
import { GroupmediclaimmodelComponent } from './pages/models/groupmediclaimmodel/groupmediclaimmodel.component';
import { GroupterminsuranceModelComponent } from './pages/models/groupterminsurance-model/groupterminsurance-model.component';
import { NominationinpfModelComponent } from './pages/models/nominationinpf-model/nominationinpf-model.component';
import { CodeofconductModelComponent } from './pages/models/codeofconduct-model/codeofconduct-model.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ImageViewerModule } from "ngx-image-viewer";
import { PreviewModelComponent } from './pages/models/preview-model/preview-model.component';
import { FamilymodelComponent } from './pages/models/familymodel/familymodel.component';
import { AlertModule } from './_alert';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertBoxComponent } from './component/nav-bar/alert-box/alert-box.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgToastModule } from 'ng-angular-popup';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { EmailComponent } from './pages/models/email/email.component';
import { LoaderComponent } from './component/loader/loader.component';

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    NavBarComponent,
    SidebarComponent,
    UsersidebarComponent,
    PersonaldetailsComponent,
    EducationComponent,
    ExperienceComponent,
    BankComponent,
    ProvidentFundComponent,
    ConfirmationDialogComponent,
    PersonaldetailsmodelComponent,
    EducationdetailsmodelComponent,
    ExperiencedetailsmodelComponent,
    BankdetailsmodelComponent,
    ProvidentFunddetailsmodelComponent,
    ViewprofileComponent,
    GratuityComponent,
    CodeOfConductComponent,
    EmployeeConfidentialAgreementComponent,
    FamilyDetailsComponent,
    DownloadComponent,
    MediclamComponent,
    GroupTermInsuranceComponent,
    NominationInPfComponent,
    FilterPipe,
    PFformDownloadComponent,
    GratuityDownloadComponent,
    GroupMediclaimDownloadComponent,
    GroupTeramInsuranceDownloadComponent,
    NominationInPfDownloadComponent,
    EmployeeConfidentialAgreementDownloadComponent,
    GrauiitymodelComponent,
    EmployeeconfidentialadreementModelComponent,
    GroupmediclaimmodelComponent,
    GroupterminsuranceModelComponent,
    NominationinpfModelComponent,
    CodeofconductModelComponent,
    PreviewModelComponent,
    FamilymodelComponent,
    AlertBoxComponent,
    EmailComponent,
    LoaderComponent
  ],
  imports: [
    NgSelectModule,
    NgxMatFileInputModule,
    NgToastModule,
    ImageViewerModule.forRoot(),
    PdfViewerModule,
    NgxPrintModule,
    BrowserModule,
    ModalModule.forRoot(),
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FileSaverModule,
    MaterialModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,
    ReactiveFormsModule,
    AlertModule,
    // NgxUiLoaderModule,
    // NgxUiLoaderHttpModule.forRoot({ showForeground: true ,
    //   exclude: [
    //     "http://localhost:1998/generate-token",
    //     "http://localhost:1998/find/countries/",
    //     "http://localhost:1998/find/state/",
    //     "http://localhost:1998/find/city",
    //     "http://localhost:1998/find/district",
    //     "http://localhost:1998/bank/user",
    //     "http://localhost:1998/coc/user",
    //     "http://localhost:1998/Edu/user",
    //     "http://localhost:1998/Employeeconfidential/user",
    //     "http://localhost:1998/Exp/user",
    //     "http://localhost:1998/Family/user",
    //     "http://localhost:1998/Gratuity/user",
    //     "http://localhost:1998/GroupTermInsurance/user",
    //     "http://localhost:1998/Mediclaim/user",
    //     "http://localhost:1998/NominationInPf/user",
    //     "http://localhost:1998/personal/user",
    //     "http://localhost:1998/pf/user",
    //     "http://localhost:1998/formstate/"

     
    //   ]},
    
      // )
    
  ],
  providers: [MatSnackBarModule,authInterceptorProviders,DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
