package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.ExpDetailsRepo;
import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.ExpDetailsService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.ExpDetails;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;

@Service
public class ExpDetailsServiceImpl implements ExpDetailsService {

	@Autowired
	public ExpDetailsRepo exprepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public ExpDetails save(ExpDetails ex) {
		// TODO Auto-generated method stub
		ExpDetails save =  this.exprepo.save(ex);
	
		User user = new User();
		 user.setId(save.getEuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getEuser());
			 formStatus2.setExperience("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setExperience("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public ExpDetails getByUser(User user) {
		// TODO Auto-generated method stub
		ExpDetails findByEuser = null;
		
		try {
			findByEuser = this.exprepo.findByEuser(user);
		} catch (Exception e) {
			e.printStackTrace();
			}
		if(findByEuser == null) {
			 throw new CustomException("601", "Experience details is Empty");
		}
		
		return findByEuser;
	}

	@Override
	public ExpDetails update(ExpDetails ex) {
		return this.exprepo.save(ex);
	
	}

}
