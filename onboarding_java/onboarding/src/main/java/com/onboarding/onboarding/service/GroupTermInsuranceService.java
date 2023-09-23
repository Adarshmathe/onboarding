package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.GroupTermInsurance;
import com.onboarding.onboarding.util.User;

public interface GroupTermInsuranceService {
	public GroupTermInsurance save(GroupTermInsurance ex);
	public GroupTermInsurance update(GroupTermInsurance ex);
	public GroupTermInsurance getByUser(User user);

}
