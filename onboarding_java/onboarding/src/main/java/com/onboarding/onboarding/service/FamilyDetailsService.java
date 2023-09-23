package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.FamilyDetails;
import com.onboarding.onboarding.util.User;

public interface FamilyDetailsService {

	public FamilyDetails save(FamilyDetails ex);
	public FamilyDetails update(FamilyDetails ex);
	public FamilyDetails getByUser(User user);
}
