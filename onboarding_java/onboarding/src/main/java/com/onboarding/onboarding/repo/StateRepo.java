package com.onboarding.onboarding.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Countries;
import com.onboarding.onboarding.util.States;

public interface StateRepo extends JpaRepository<States, Long> {
	
	List<States> findByCountry(Countries c);

}
