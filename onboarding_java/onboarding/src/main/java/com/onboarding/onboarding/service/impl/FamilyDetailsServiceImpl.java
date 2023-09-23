package com.onboarding.onboarding.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FamilyDetailsrepo;
import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.FamilyDetailsService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FamilyDetails;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;
@Service
public class FamilyDetailsServiceImpl implements FamilyDetailsService {

	
	@Autowired
	public FamilyDetailsrepo familyrepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public FamilyDetails save(FamilyDetails ex) {
		// TODO Auto-generated method stub
		FamilyDetails save = this.familyrepo.save(ex);	
		
		User user = new User();
		 user.setId(save.getFuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getFuser());
			 formStatus2.setFamily("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setFamily("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
		
	}

	@Override
	public FamilyDetails update(FamilyDetails ex) {
		// TODO Auto-generated method stub
		return this.familyrepo.save(ex);
	}

	@Override
	public FamilyDetails getByUser(User user) {
   FamilyDetails familydetails = null;
   
	   try {
		   familydetails= this.familyrepo.findByFuser(user);
	  } catch (Exception e) {
		e.printStackTrace();
		}
	   
		if(familydetails == null) {
			 throw new CustomException("601", "Family details is Empty");
		}
	   
			return familydetails;
		}
	

}
