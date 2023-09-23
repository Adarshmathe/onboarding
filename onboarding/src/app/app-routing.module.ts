import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeConfidentialAgreementDownloadComponent } from './pages/models/download/employee-confidential-agreement-download/employee-confidential-agreement-download.component';
import { GratuityDownloadComponent } from './pages/models/download/gratuity-download/gratuity-download.component';
import { GroupMediclaimDownloadComponent } from './pages/models/download/group-mediclaim-download/group-mediclaim-download.component';
import { GroupTeramInsuranceDownloadComponent } from './pages/models/download/group-teram-insurance-download/group-teram-insurance-download.component';
import { NominationInPfDownloadComponent } from './pages/models/download/nomination-in-pf-download/nomination-in-pf-download.component';
import { PFformDownloadComponent } from './pages/models/download/pfform-download/pfform-download.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { BankComponent } from './pages/userComponents/bank/bank.component';
import { CodeOfConductComponent } from './pages/userComponents/code-of-conduct/code-of-conduct.component';
import { EducationComponent } from './pages/userComponents/education/education.component';
import { EmployeeConfidentialAgreementComponent } from './pages/userComponents/employee-confidential-agreement/employee-confidential-agreement.component';
import { ExperienceComponent } from './pages/userComponents/experience/experience.component';
import { FamilyDetailsComponent } from './pages/userComponents/family-details/family-details.component';
import { GratuityComponent } from './pages/userComponents/gratuity/gratuity.component';
import { GroupTermInsuranceComponent } from './pages/userComponents/group-term-insurance/group-term-insurance.component';
import { MediclamComponent } from './pages/userComponents/mediclam/mediclam.component';
import { NominationInPfComponent } from './pages/userComponents/nomination-in-pf/nomination-in-pf.component';
import { PersonaldetailsComponent } from './pages/userComponents/personaldetails/personaldetails.component';
import { ProvidentFundComponent } from './pages/userComponents/provident-fund/provident-fund.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {path:"signup", component:SignupComponent,pathMatch:"full"},
  {path:"login", component:LoginComponent,pathMatch:"full"},
  {path:'admin', component:AdminComponent,canActivate:[AdminGuard]},
  {path:"user-dashboard", component:UserComponent, canActivate:[UserGuard],children:[
    {path:"" ,component:PersonaldetailsComponent},
    {path:"experience" ,component:ExperienceComponent},
    {path:"education" , component:EducationComponent},
    {path:"bank" ,component:BankComponent},
    {path:"pf" ,component:ProvidentFundComponent},
    {path:"gratuity" ,component:GratuityComponent},
    {path:"eca" ,component:EmployeeConfidentialAgreementComponent},
    {path:"coc" ,component:CodeOfConductComponent},
    {path:"fdc" ,component:FamilyDetailsComponent},
    {path:"mediclaim" ,component:MediclamComponent},
    {path:"insurance" ,component:GroupTermInsuranceComponent},
    {path:"nomination" ,component:NominationInPfComponent},
    // {path:"pfdownload" ,component:PFformDownloadComponent},
    // {path:"gratuitydownload" ,component:GratuityDownloadComponent},
    // {path:"ecadownload" ,component:EmployeeConfidentialAgreementDownloadComponent},
    // {path:"mediclaimdownload" ,component:GroupMediclaimDownloadComponent},
    // {path:"insurancedownload" ,component:GroupTeramInsuranceDownloadComponent},
    // {path:"nominationdownload" ,component:NominationInPfDownloadComponent},

  ]},
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:'**',redirectTo:'login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
