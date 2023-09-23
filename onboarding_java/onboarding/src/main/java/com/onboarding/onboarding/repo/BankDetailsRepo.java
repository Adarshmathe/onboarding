package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.BankDetails;
import com.onboarding.onboarding.util.User;

public interface BankDetailsRepo extends JpaRepository<BankDetails, Long> {
	public BankDetails findByBuser(User user);
}
