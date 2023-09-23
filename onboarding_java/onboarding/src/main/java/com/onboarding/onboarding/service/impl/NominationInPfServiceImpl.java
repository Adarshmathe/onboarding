package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.repo.NominationInPfRepo;
import com.onboarding.onboarding.service.NominationInPfService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.NominationInPf;
import com.onboarding.onboarding.util.User;

@Service
public class NominationInPfServiceImpl implements NominationInPfService{

	@Autowired
	public NominationInPfRepo NominationInPfRepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public NominationInPf save(NominationInPf ex) {
		// TODO Auto-generated method stub
		NominationInPf save = this.NominationInPfRepo.save(ex);	
		
		User user = new User();
		 user.setId(save.getNuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getNuser());
			 formStatus2.setNominationinPF("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setNominationinPF("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public NominationInPf update(NominationInPf ex) {
		// TODO Auto-generated method stub
		return this.NominationInPfRepo.save(ex);	
	}

	@Override
	public NominationInPf getByUser(User user) {
		// TODO Auto-generated method stub
		NominationInPf NominationInPf = null;
		try {
			NominationInPf =this.NominationInPfRepo.findByNuser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(NominationInPf == null) {
			 throw new CustomException("601", "NominationInPf details is Empty");
		}
		return NominationInPf;
	}

}
