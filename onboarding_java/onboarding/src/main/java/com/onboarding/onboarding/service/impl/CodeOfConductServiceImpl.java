package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.CodeOfConductRepo;
import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.CodeOfConductService;
import com.onboarding.onboarding.util.BankDetails;
import com.onboarding.onboarding.util.CodeOfConduct;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;
@Service
public class CodeOfConductServiceImpl implements CodeOfConductService {
	@Autowired
	private CodeOfConductRepo CodeOfConductRepo;
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public CodeOfConduct save(CodeOfConduct p) {
		// TODO Auto-generated method stub
		CodeOfConduct save = null;

			User user = new User();
			 user.setId(p.getCocuser().getId());
			 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
			
			 if(FormStatus==null) {
				 throw new CustomException("601", "Please Fill Above forms Details");
//				 FormStatus formStatus2 = new FormStatus();
//				 formStatus2.setFormuser(save.getCocuser());
//				 formStatus2.setCodeOfConduct("1");
//				 this.FormStatusRepo.save(formStatus2);
			 }else {
				 
				 if(FormStatus.getPersonal()==null) {
					 throw new CustomException("601", "Please Fill Personal Details");
					 
				 }else if(FormStatus.getFamily() == null) {
					 throw new CustomException("601", "Please Fill Family Details");
					
				 }else if(FormStatus.getEducation()==null) {
					 throw new CustomException("601", "Please Fill Education Details");
				 }else if(FormStatus.getExperience()==null) {
					 throw new CustomException("601", "Please Fill Experience Details");
				 }else if(FormStatus.getBank()==null) {
					 throw new CustomException("601", "Please Fill Bank Details");
				 }else if(FormStatus.getProvident()==null) {
					 throw new CustomException("601", "Please Fill Provident Fund Details");
				 }else if(FormStatus.getGratuity()==null) {
					 throw new CustomException("601", "Please Fill Gratuity Details");
				 }else if(FormStatus.getEmployeeConfidentialityAgreement()==null) {
					 throw new CustomException("601", "Please Fill EmployeeConfidentialityAgreement Details");
				 }else if(FormStatus.getGroupMediclaim()==null) {
					 throw new CustomException("601", "Please Fill GroupMediclaim Details");
				 }else if(FormStatus.getGroupTermInsurance()==null) {
					 throw new CustomException("601", "Please Fill GroupTermInsurance Details");
				 }else if(FormStatus.getNominationinPF()==null) {
					 throw new CustomException("601", "Please Fill Nomination in PF Details");
				 }else {
					 
					 FormStatus.setPersonal("2");
					 FormStatus.setFamily("2");
					 FormStatus.setEducation("2");
					 FormStatus.setExperience("2");
					 FormStatus.setBank("2");
					 FormStatus.setProvident("2");
					 FormStatus.setGratuity("2");
					 FormStatus.setEmployeeConfidentialityAgreement("2");
					 FormStatus.setGroupMediclaim("2");
					 FormStatus.setGroupTermInsurance("2");
					 FormStatus.setNominationinPF("2");
					 FormStatus.setCodeOfConduct("2");
					 com.onboarding.onboarding.util.FormStatus save2 = this.FormStatusRepo.save(FormStatus);
					 if(save2!= null) {
						 save = this.CodeOfConductRepo.save(p);
					 }
					  
				 }
			
//				 FormStatus.setCodeOfConduct("1");
//				 this.FormStatusRepo.save(FormStatus);
			 }
			 return save;
	}

	@Override
	public CodeOfConduct getByUser(User user) {
		
//		return this.CodeOfConductRepo.findByCocuser(user);
		CodeOfConduct CodeOfConduct = null;
		try {
			CodeOfConduct =	this.CodeOfConductRepo.findByCocuser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(CodeOfConduct == null) {
			 throw new CustomException("601", "CodeOfConduct details is Empty");
		}
		
		return CodeOfConduct;
	}

	@Override
	public CodeOfConduct update(CodeOfConduct p) {
		return this.CodeOfConductRepo.save(p);
	}

}
