package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.FormStatusRepo;
import com.onboarding.onboarding.service.FormStatusService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.FormStatus;

import com.onboarding.onboarding.util.User;

@Service
public class FormStatusServiceImpl implements FormStatusService {
	
	@Autowired
	public FormStatusRepo FormStatusRepo;

	@Override
	public FormStatus save(FormStatus ex) {
		// TODO Auto-generated method stub
		return this.FormStatusRepo.save(ex);	
	}

	@Override
	public FormStatus update(FormStatus ex) {
		// TODO Auto-generated method stub
		return this.FormStatusRepo.save(ex);	
	}

	@Override
	public FormStatus getByUser(User user) {
		// TODO Auto-generated method stub
		FormStatus FormStatus = null;
		
		try {
			FormStatus =this.FormStatusRepo.findByFormuser(user);
		} catch (Exception e) {
			e.printStackTrace();	
			}
		if(FormStatus == null) {
			 throw new CustomException("601", "FormStatus details is Empty");
		}
		return FormStatus;	
	}

}
