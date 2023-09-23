package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.EmployeeConfedentialAgreement;
import com.onboarding.onboarding.util.User;

public interface EmployeeConfidentialRepo extends JpaRepository<EmployeeConfedentialAgreement, Long>{
	public EmployeeConfedentialAgreement findByEcauser(User user);
}
