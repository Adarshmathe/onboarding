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

import com.onboarding.onboarding.service.CodeOfConductService;
import com.onboarding.onboarding.util.CodeOfConduct;
import com.onboarding.onboarding.util.User;
@RestController
@RequestMapping("/coc")
@CrossOrigin("*")
public class CodeOfConductController {
	
	@Autowired
	private CodeOfConductService cocservice;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody CodeOfConduct pe) {
				
		CodeOfConduct save = this.cocservice.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody CodeOfConduct pe) {
				
		CodeOfConduct save = this.cocservice.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public CodeOfConduct getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		CodeOfConduct byUser = this.cocservice.getByUser(user);

		return byUser;
	}

}
