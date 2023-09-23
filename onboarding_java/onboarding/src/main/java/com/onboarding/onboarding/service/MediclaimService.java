package com.onboarding.onboarding.service;


import com.onboarding.onboarding.util.Mediclaim;
import com.onboarding.onboarding.util.User;

public interface MediclaimService {
	public Mediclaim save(Mediclaim ex);
	public Mediclaim update(Mediclaim ex);
	public Mediclaim getByUser(User user);

}
