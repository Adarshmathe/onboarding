package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.CodeOfConduct;
import com.onboarding.onboarding.util.User;

public interface CodeOfConductRepo extends JpaRepository<CodeOfConduct, Long>{
	public CodeOfConduct findByCocuser(User user);
}
