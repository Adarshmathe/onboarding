package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.EduDetails;
import com.onboarding.onboarding.util.User;

public interface EduDetailsRepo extends JpaRepository<EduDetails, Long> {
	public EduDetails findByEduuser(User user);
}
