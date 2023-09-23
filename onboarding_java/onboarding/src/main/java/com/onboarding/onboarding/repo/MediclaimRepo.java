package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Mediclaim;
import com.onboarding.onboarding.util.User;

public interface MediclaimRepo extends JpaRepository<Mediclaim, Long>{
	public Mediclaim findByMuser(User user);

}
