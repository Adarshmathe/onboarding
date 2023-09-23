package com.onboarding.onboarding.repo;


import org.springframework.data.jpa.repository.JpaRepository;


import com.onboarding.onboarding.util.User;
import com.onboarding.onboarding.util.UserRole;

public interface UserRoleRepo extends JpaRepository<UserRole, Long> {
	UserRole findByUser(User user);
}
