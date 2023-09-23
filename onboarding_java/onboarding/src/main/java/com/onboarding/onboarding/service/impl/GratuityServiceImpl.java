package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.repo.GratuityRepo;
import com.onboarding.onboarding.service.GratuityService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.Gratuity;
import com.onboarding.onboarding.util.User;

@Service
public class GratuityServiceImpl implements GratuityService {
	
	
	@Autowired
	public GratuityRepo GratuityRepo;

	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public Gratuity save(Gratuity ex) {
		// TODO Auto-generated method stub
		Gratuity save = this.GratuityRepo.save(ex);	
		
		User user = new User();
		 user.setId(save.getGuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getGuser());
			 formStatus2.setGratuity("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setGratuity("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
		}

	@Override
	public Gratuity update(Gratuity ex) {
		// TODO Auto-generated method stub
		return this.GratuityRepo.save(ex);	
		}

	@Override
	public Gratuity getByUser(User user) {
		// TODO Auto-generated method stub
		Gratuity Gratuity = null;
		
		try {
			Gratuity =this.GratuityRepo.findByGuser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(Gratuity == null) {
			 throw new CustomException("601", "Gratuity details is Empty");
		}
		return Gratuity;	
		
		}

}
