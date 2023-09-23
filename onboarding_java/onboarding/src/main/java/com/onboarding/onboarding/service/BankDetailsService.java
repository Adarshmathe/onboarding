package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.BankDetails;
import com.onboarding.onboarding.util.User;

public interface BankDetailsService {
	public BankDetails save(BankDetails ex);
	public BankDetails update(BankDetails ex);
	public BankDetails getByUser(User user);

}
