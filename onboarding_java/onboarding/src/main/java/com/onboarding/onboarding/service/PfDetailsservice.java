package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.PfDetails;
import com.onboarding.onboarding.util.User;

public interface PfDetailsservice {
	
	public PfDetails save(PfDetails ex);
	public PfDetails update(PfDetails ex);
	public PfDetails getByUser(User user);

}
