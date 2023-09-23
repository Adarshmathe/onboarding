package com.onboarding.onboarding.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onboarding.onboarding.service.ExpDetailsService;
import com.onboarding.onboarding.util.ExpDetails;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/Exp")
@CrossOrigin("*")
public class ExpDetailsController {

	@Autowired
	private ExpDetailsService expservice;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody ExpDetails pe) {
				
		ExpDetails save = this.expservice.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody ExpDetails pe) {
				
		ExpDetails save = this.expservice.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public ExpDetails getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		ExpDetails byUser = this.expservice.getByUser(user);
		
		return byUser;
	}
}

