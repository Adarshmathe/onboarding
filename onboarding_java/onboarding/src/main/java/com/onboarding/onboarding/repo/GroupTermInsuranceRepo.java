package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.GroupTermInsurance;
import com.onboarding.onboarding.util.User;

public interface GroupTermInsuranceRepo extends JpaRepository<GroupTermInsurance, Long> {
	public GroupTermInsurance findByGtiuser(User user);
}
