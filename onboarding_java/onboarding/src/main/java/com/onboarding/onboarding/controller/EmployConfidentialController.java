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

import com.onboarding.onboarding.service.EmployeeConfidentialService;
import com.onboarding.onboarding.util.EmployeeConfedentialAgreement;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/Employeeconfidential")
@CrossOrigin("*")
public class EmployConfidentialController {
	
	@Autowired
	private EmployeeConfidentialService EmployeeConfidentialService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody EmployeeConfedentialAgreement pe) {
				
		EmployeeConfedentialAgreement save = this.EmployeeConfidentialService.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody EmployeeConfedentialAgreement pe) {
				
		EmployeeConfedentialAgreement save = this.EmployeeConfidentialService.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public EmployeeConfedentialAgreement getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		EmployeeConfedentialAgreement byUser = this.EmployeeConfidentialService.getByUser(user);

		return byUser;
	}

}
