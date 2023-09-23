package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.repo.GroupTermInsuranceRepo;
import com.onboarding.onboarding.service.GroupTermInsuranceService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.GroupTermInsurance;
import com.onboarding.onboarding.util.User;

@Service
public class GroupTermInsuranceServiceImpl implements GroupTermInsuranceService {

	
	@Autowired
	public GroupTermInsuranceRepo GroupTermInsuranceRepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public GroupTermInsurance save(GroupTermInsurance ex) {
		// TODO Auto-generated method stub
		GroupTermInsurance save = this.GroupTermInsuranceRepo.save(ex);	
		
		User user = new User();
		 user.setId(save.getGtiuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getGtiuser());
			 formStatus2.setGroupTermInsurance("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setGroupTermInsurance("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
		
	}

	@Override
	public GroupTermInsurance update(GroupTermInsurance ex) {
		// TODO Auto-generated method stub
		return this.GroupTermInsuranceRepo.save(ex);	
	}

	@Override
	public GroupTermInsurance getByUser(User user) {
		// TODO Auto-generated method stub
		GroupTermInsurance GroupTermInsurance = null;
		try {
			GroupTermInsurance=this.GroupTermInsuranceRepo.findByGtiuser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(GroupTermInsurance == null) {
			 throw new CustomException("601", "GroupTermInsurance details is Empty");
		}
		return GroupTermInsurance;
	}

}
