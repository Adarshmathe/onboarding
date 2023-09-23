package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Gratuity;
import com.onboarding.onboarding.util.User;

public interface GratuityRepo extends JpaRepository<Gratuity, Long> {
	public Gratuity findByGuser(User user);
}
