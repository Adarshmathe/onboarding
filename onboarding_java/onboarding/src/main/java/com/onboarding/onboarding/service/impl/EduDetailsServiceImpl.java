package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.EduDetailsRepo;
import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.EduDetailsService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.EduDetails;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;

@Service
public class EduDetailsServiceImpl implements EduDetailsService {
	
	@Autowired
	public EduDetailsRepo edurepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	

	@Override
	public EduDetails save(EduDetails ex) {
		// TODO Auto-generated method stub
		EduDetails save =  this.edurepo.save(ex);
		
		User user = new User();
		 user.setId(save.getEduuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getEduuser());
			 formStatus2.setEducation("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setEducation("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public EduDetails update(EduDetails ex) {
		// TODO Auto-generated method stub
		return this.edurepo.save(ex);
	}

	@Override
	public EduDetails getByUser(User user) {
		// TODO Auto-generated method stub
		EduDetails findByEuser = null;
		
		try {
			findByEuser = this.edurepo.findByEduuser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(findByEuser == null) {
			 throw new CustomException("601", "Education details is Empty");
		}
		return findByEuser;
	}

}
