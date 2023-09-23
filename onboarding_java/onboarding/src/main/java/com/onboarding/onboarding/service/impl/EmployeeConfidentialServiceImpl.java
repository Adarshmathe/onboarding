package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.EmployeeConfidentialRepo;
import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.EmployeeConfidentialService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.EmployeeConfedentialAgreement;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;

@Service
public class EmployeeConfidentialServiceImpl implements EmployeeConfidentialService {
	
	@Autowired
	public EmployeeConfidentialRepo EmployeeConfidentialRepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;

	@Override
	public EmployeeConfedentialAgreement save(EmployeeConfedentialAgreement ex) {
		// TODO Auto-generated method stub
		EmployeeConfedentialAgreement save =  this.EmployeeConfidentialRepo.save(ex);	
		
		User user = new User();
		 user.setId(save.getEcauser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getEcauser());
			 formStatus2.setEmployeeConfidentialityAgreement("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setEmployeeConfidentialityAgreement("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
		}

	@Override
	public EmployeeConfedentialAgreement update(EmployeeConfedentialAgreement ex) {
		// TODO Auto-generated method stub
		return this.EmployeeConfidentialRepo.save(ex);	}

	@Override
	public EmployeeConfedentialAgreement getByUser(User user) {
		// TODO Auto-generated method stub
		EmployeeConfedentialAgreement EmployeeConfedentialAgreement = null;
		
		try {
			EmployeeConfedentialAgreement =	this.EmployeeConfidentialRepo.findByEcauser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(EmployeeConfedentialAgreement == null) {
			 throw new CustomException("601", "EmployeeConfedentialAgreement details is Empty");
		}
			return EmployeeConfedentialAgreement;	
			}

}
