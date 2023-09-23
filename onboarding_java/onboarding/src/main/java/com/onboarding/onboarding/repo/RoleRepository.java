package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
	
}
