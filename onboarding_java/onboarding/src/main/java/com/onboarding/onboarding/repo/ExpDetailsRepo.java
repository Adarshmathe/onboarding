package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.ExpDetails;
import com.onboarding.onboarding.util.User;

public interface ExpDetailsRepo extends JpaRepository<ExpDetails, Long> {

	public ExpDetails findByEuser(User user);
}
