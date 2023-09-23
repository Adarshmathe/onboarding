package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.PersonalDetails;
import com.onboarding.onboarding.util.User;

public interface PersonalDetailsService {

	public PersonalDetails save(PersonalDetails p);
	public PersonalDetails update(PersonalDetails p);
	public PersonalDetails getByUser(User user);
}
