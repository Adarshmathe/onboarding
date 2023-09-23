package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.repo.MediclaimRepo;
import com.onboarding.onboarding.service.MediclaimService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.Mediclaim;
import com.onboarding.onboarding.util.User;

@Service
public class MediclaimServiceImpl implements MediclaimService {

	@Autowired
	public MediclaimRepo MediclaimRepo;
	
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public Mediclaim save(Mediclaim ex) {
		// TODO Auto-generated method stub
		Mediclaim save = this.MediclaimRepo.save(ex);	
		
		User user = new User();
		 user.setId(save.getMuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getMuser());
			 formStatus2.setGroupMediclaim("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setGroupMediclaim("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public Mediclaim update(Mediclaim ex) {
		// TODO Auto-generated method stub
		return this.MediclaimRepo.save(ex);	
	}

	@Override
	public Mediclaim getByUser(User user) {
		// TODO Auto-generated method stub
		Mediclaim Mediclaim = null;
		try {
			Mediclaim = this.MediclaimRepo.findByMuser(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(Mediclaim == null) {
			 throw new CustomException("601", "Mediclaim details is Empty");
		}
		return Mediclaim;
	}

}
