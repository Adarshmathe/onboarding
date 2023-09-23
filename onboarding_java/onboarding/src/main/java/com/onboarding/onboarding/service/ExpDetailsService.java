package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.ExpDetails;
import com.onboarding.onboarding.util.User;

public interface ExpDetailsService {
	
	public ExpDetails save(ExpDetails ex);
	public ExpDetails update(ExpDetails ex);
	public ExpDetails getByUser(User user);
}
