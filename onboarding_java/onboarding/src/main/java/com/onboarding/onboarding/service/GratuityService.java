package com.onboarding.onboarding.service;


import com.onboarding.onboarding.util.Gratuity;
import com.onboarding.onboarding.util.User;

public interface GratuityService {

	public Gratuity save(Gratuity ex);
	public Gratuity update(Gratuity ex);
	public Gratuity getByUser(User user);
}
