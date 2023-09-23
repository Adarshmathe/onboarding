package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.FamilyDetails;
import com.onboarding.onboarding.util.User;

public interface FamilyDetailsrepo extends JpaRepository<FamilyDetails, Long> {
	public FamilyDetails findByFuser(User user);

}
