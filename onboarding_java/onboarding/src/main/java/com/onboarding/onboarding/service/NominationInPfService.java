package com.onboarding.onboarding.service;


import com.onboarding.onboarding.util.NominationInPf;
import com.onboarding.onboarding.util.User;

public interface NominationInPfService {
	public NominationInPf save(NominationInPf ex);
	public NominationInPf update(NominationInPf ex);
	public NominationInPf getByUser(User user);

}
