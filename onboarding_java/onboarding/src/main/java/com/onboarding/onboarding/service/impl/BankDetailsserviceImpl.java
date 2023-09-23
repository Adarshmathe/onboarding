package com.onboarding.onboarding.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.onboarding.onboarding.repo.BankDetailsRepo;
import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.BankDetailsService;
import com.onboarding.onboarding.util.Bank;
import com.onboarding.onboarding.util.BankDetails;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;
@Service
public class BankDetailsserviceImpl implements BankDetailsService{

	
	@Autowired
	public BankDetailsRepo bankrepo;
	@Autowired
	public FormStatusRepo FormStatusRepo;
	
	@Override
	public BankDetails save(BankDetails ex) {
	
	   BankDetails save = this.bankrepo.save(ex);	
		User user = new User();
		 user.setId(save.getBuser().getId());
		 FormStatus FormStatus = this.FormStatusRepo.findByFormuser(user);
		
		 if(FormStatus==null) {
			 
			 FormStatus formStatus2 = new FormStatus();
			 formStatus2.setFormuser(save.getBuser());
			 formStatus2.setBank("1");
			 this.FormStatusRepo.save(formStatus2);
		 }else {
			 
			 FormStatus.setBank("1");
			 this.FormStatusRepo.save(FormStatus);
		 }
		 return save;
	}

	@Override
	public BankDetails update(BankDetails ex) {
		return this.bankrepo.save(ex);
	}

	@Override
	public BankDetails getByUser(User user) {
		
		BankDetails bankdetails = null;
	
		try{	
			
		 bankdetails = this.bankrepo.findByBuser(user);
		 
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		if(bankdetails == null) {
			 throw new CustomException("601", "Bank details is Empty");
		}
		
		List<Bank> extras = bankdetails.getExtras();
		
		for(Bank b : extras) {
			b.setConfirmbankaccountno(b.getBankaccountno());
			b.setConfirmifsccode(b.getIfsccode());
			
		}
		
		
	
		return bankdetails;
	
	}

}
