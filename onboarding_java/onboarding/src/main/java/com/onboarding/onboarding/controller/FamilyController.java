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
import com.onboarding.onboarding.service.FamilyDetailsService;
import com.onboarding.onboarding.util.FamilyDetails;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/Family")
@CrossOrigin("*")
public class FamilyController {

	@Autowired
	private FamilyDetailsService familyservice;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody FamilyDetails pe) {
				
		System.out.println(pe);
		FamilyDetails save = this.familyservice.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody FamilyDetails pe) {
				
		FamilyDetails save = this.familyservice.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public FamilyDetails getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		FamilyDetails byUser = this.familyservice.getByUser(user);

		return byUser;
	}
}
