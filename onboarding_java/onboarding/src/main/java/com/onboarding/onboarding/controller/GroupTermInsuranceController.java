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
import com.onboarding.onboarding.service.GroupTermInsuranceService;
import com.onboarding.onboarding.util.GroupTermInsurance;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/GroupTermInsurance")
@CrossOrigin("*")
public class GroupTermInsuranceController {
	
	@Autowired
	private GroupTermInsuranceService GroupTermInsuranceService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody GroupTermInsurance pe) {
				
		GroupTermInsurance save = this.GroupTermInsuranceService.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody GroupTermInsurance pe) {
				
		GroupTermInsurance save = this.GroupTermInsuranceService.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public GroupTermInsurance getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		GroupTermInsurance byUser = this.GroupTermInsuranceService.getByUser(user);

		return byUser;
	}
}
