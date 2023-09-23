package com.onboarding.onboarding.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Cities;
import com.onboarding.onboarding.util.States;

public interface CityRepo extends JpaRepository<Cities, Long> {
	List<Cities> findByState(States s);
}
