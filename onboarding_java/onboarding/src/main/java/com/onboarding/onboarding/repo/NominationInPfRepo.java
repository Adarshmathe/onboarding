package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.NominationInPf;
import com.onboarding.onboarding.util.User;

public interface NominationInPfRepo extends JpaRepository<NominationInPf, Long> {
	public NominationInPf findByNuser(User user);
}
