package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.repo.PersonalDetailsRepo;
import com.onboarding.onboarding.service.PersonalDetailsService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.PersonalDetails;
import com.onboarding.onboarding.util.User;

@Service
public class PersonalDetetailsServiceImpl implements PersonalDetailsService{

	@Autowired
	private PersonalDetailsRepo PersonalRepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	

	@Override
	public PersonalDetails save(PersonalDetails p) {
		// TODO Auto-generated method stub
		 PersonalDetails save = this.PersonalRepo.save(p);
		 User user = new User();
		 user.setId(save.getUser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getUser());
			 formStatus2.setPersonal("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setPersonal("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public PersonalDetails getByUser(User user) {
		// TODO Auto-generated method stub
		PersonalDetails personaldetails = null;
		
		try{	
			
			personaldetails = this.PersonalRepo.findByUser(user);
			 
			}catch(Exception e) {
				e.printStackTrace();
			}
		if(personaldetails == null) {
			 throw new CustomException("601", "personal details is null");
		}
			return personaldetails;
	}

	@Override
	public PersonalDetails update(PersonalDetails p) {

		return this.PersonalRepo.save(p);
		
	}
}