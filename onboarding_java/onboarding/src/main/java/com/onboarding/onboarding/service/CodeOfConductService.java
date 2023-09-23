package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.CodeOfConduct;
import com.onboarding.onboarding.util.User;

public interface CodeOfConductService {
	public CodeOfConduct save(CodeOfConduct ex);
	public CodeOfConduct update(CodeOfConduct ex);
	public CodeOfConduct getByUser(User user);

}
