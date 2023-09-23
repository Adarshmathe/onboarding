package com.onboarding.onboarding.config;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.onboarding.onboarding.service.impl.UserDetailsServiceImpl;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.JwtRequest;
import com.onboarding.onboarding.util.JwtResponse;
import com.onboarding.onboarding.util.User;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsServiceImpl userDetailService;
	@Autowired
	private JwtUtil jwtUtil;
	
	//generate token
	@RequestMapping(value="/generate-token", method = RequestMethod.POST)
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
		
		try {
			
			authenticate(jwtRequest.getUserName(), jwtRequest.getPassword());
			
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new CustomException("601","invalid credentials");
		} 
		
		UserDetails userDetails=this.userDetailService.loadUserByUsername(jwtRequest.getUserName());
		
		String token = this.jwtUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(new JwtResponse(token));
		
	}
	
	

	private void authenticate(String username, String password) throws Exception{
		
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));

			
		} catch (DisabledException e) {
			throw new CustomException("601","USER DISABLED "+ e.getMessage());
		}catch(BadCredentialsException e) {
			throw new CustomException("601","INVALID CREDENTIAL");
		}
	}
	
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal) {
		
//		System.out.println("principlr"+principal.getName());
		return ((User)this.userDetailService.loadUserByUsername(principal.getName()));
	}
	
	
	
}
