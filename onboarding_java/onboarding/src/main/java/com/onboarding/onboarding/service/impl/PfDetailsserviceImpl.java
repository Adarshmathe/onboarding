package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.repo.PfDetailsRepo;
import com.onboarding.onboarding.service.PfDetailsservice;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.PfDetails;
import com.onboarding.onboarding.util.User;

@Service
public class PfDetailsserviceImpl implements PfDetailsservice{
	
	@Autowired
	private PfDetailsRepo pfrepo;

	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public PfDetails save(PfDetails pf) {
	
		PfDetails save = this.pfrepo.save(pf);
		
		 User user = new User();
		 user.setId(save.getPfuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getPfuser());
			 formStatus2.setProvident("1");;
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setProvident("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public PfDetails update(PfDetails pf) {
		// TODO Auto-generated method stub
		return this.pfrepo.save(pf);
	}

	@Override
	public PfDetails getByUser(User user) {
		
		PfDetails pfdetails = null;
	try {
		pfdetails =this.pfrepo.findByPfuser(user);
	} catch (Exception e) {
		e.printStackTrace();
	}
	if(pfdetails == null) {
		 throw new CustomException("601", "ProvidentFund details is Empty");
	}
		return pfdetails;
	}

}
