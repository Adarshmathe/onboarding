package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.PersonalDetails;
import com.onboarding.onboarding.util.User;

public interface PersonalDetailsRepo extends JpaRepository<PersonalDetails, Long>{
	
	public PersonalDetails findByUser(User user);
}
