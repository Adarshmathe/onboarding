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
import com.onboarding.onboarding.service.PfDetailsservice;
import com.onboarding.onboarding.util.PfDetails;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/pf")
@CrossOrigin("*")
public class PfController {
	
	@Autowired
	private PfDetailsservice pfservice;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody PfDetails pe) {
				
		PfDetails save = this.pfservice.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody PfDetails pe) {
				
		PfDetails save = this.pfservice.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public PfDetails getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		PfDetails byUser = this.pfservice.getByUser(user);

		return byUser;
	}

}
