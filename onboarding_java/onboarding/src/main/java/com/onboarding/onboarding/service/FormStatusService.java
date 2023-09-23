package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;

public interface FormStatusService {
	public FormStatus save(FormStatus ex);
	public FormStatus update(FormStatus ex);
	public FormStatus getByUser(User user);
}
