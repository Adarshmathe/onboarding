package com.onboarding.onboarding.service;

import com.onboarding.onboarding.util.EmployeeConfedentialAgreement;
import com.onboarding.onboarding.util.User;

public interface EmployeeConfidentialService {
	public EmployeeConfedentialAgreement save(EmployeeConfedentialAgreement ex);
	public EmployeeConfedentialAgreement update(EmployeeConfedentialAgreement ex);
	public EmployeeConfedentialAgreement getByUser(User user);


}
