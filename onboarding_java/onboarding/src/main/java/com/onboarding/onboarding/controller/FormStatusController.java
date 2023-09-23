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
import com.onboarding.onboarding.service.FormStatusService;
import com.onboarding.onboarding.util.FormStatus;
import com.onboarding.onboarding.util.User;
@RestController
@RequestMapping("/formstate")
@CrossOrigin("*")
public class FormStatusController {
	
	@Autowired
	private FormStatusService FormStatusService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody FormStatus pe) {
				
		FormStatus save = this.FormStatusService.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody FormStatus pe) {
				
		FormStatus save = this.FormStatusService.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public FormStatus getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		FormStatus byUser = this.FormStatusService.getByUser(user);

		return byUser;
	}
}
