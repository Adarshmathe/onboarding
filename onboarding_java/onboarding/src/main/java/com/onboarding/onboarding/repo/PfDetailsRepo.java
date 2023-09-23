package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.PfDetails;
import com.onboarding.onboarding.util.User;

public interface PfDetailsRepo extends JpaRepository<PfDetails, Long>{
	
	public PfDetails findByPfuser(User user);

}
