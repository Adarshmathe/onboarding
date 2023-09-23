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
import com.onboarding.onboarding.service.MediclaimService;
import com.onboarding.onboarding.util.Mediclaim;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/Mediclaim")
@CrossOrigin("*")
public class MediclaimController {

	@Autowired
	private MediclaimService MediclaimService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody Mediclaim pe) {
				
		Mediclaim save = this.MediclaimService.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody Mediclaim pe) {
				
		Mediclaim save = this.MediclaimService.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public Mediclaim getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		Mediclaim byUser = this.MediclaimService.getByUser(user);

		return byUser;
	}
}
