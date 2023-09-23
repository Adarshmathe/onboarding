package com.onboarding.onboarding.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Districts;
import com.onboarding.onboarding.util.States;

public interface DistrictRepo extends JpaRepository<Districts, Long> {
	
	List<Districts> findByDstate(States s);

}
