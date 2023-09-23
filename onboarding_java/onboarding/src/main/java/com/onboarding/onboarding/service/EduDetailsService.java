package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.EduDetails;
import com.onboarding.onboarding.util.User;

public interface EduDetailsService {
	public EduDetails save(EduDetails ex);
	public EduDetails update(EduDetails ex);
	public EduDetails getByUser(User user);
}

