package com.onboarding.onboarding.repo;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.onboarding.onboarding.util.User;

public interface userRepository extends JpaRepository<User, Long> {

//public User findByUsername(String username);
	
	@Query("select u from User u where u.email = :email")
	public User getUserByEmail(@Param("email") String email);
	
	List<User> findByCreatedOnBetween(Date startDate, Date endDate);


}
