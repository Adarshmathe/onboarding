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

import com.onboarding.onboarding.service.GratuityService;
import com.onboarding.onboarding.util.Gratuity;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/Gratuity")
@CrossOrigin("*")
public class GratuityController {
	
	@Autowired
	private GratuityService GratuityService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody Gratuity pe) {
				
		Gratuity save = this.GratuityService.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody Gratuity pe) {
				
		Gratuity save = this.GratuityService.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public Gratuity getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		Gratuity byUser = this.GratuityService.getByUser(user);

		return byUser;
	}
}
