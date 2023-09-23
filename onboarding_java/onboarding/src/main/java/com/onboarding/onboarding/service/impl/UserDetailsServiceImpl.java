package com.onboarding.onboarding.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	private com.onboarding.onboarding.repo.userRepository userRepository;

	@SuppressWarnings("null")
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = this.userRepository.getUserByEmail(username);
		if(user==null) {
			System.out.println("user not found..");
			throw new UsernameNotFoundException("User not found..");
		}else if(user.isEnabled()== false){
			System.out.println("user blocked");
//			throw new DisabledException("User is blocked");
			throw new CustomException("601","User is blocked");
		}else {
			return user;
		}
		
		
	}
}
