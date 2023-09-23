package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;

public interface FormStatusRepo extends JpaRepository<FormStatus, Long>{
	public FormStatus findByFormuser(User user);
}
