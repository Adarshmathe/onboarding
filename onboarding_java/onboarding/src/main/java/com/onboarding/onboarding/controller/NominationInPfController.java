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
import com.onboarding.onboarding.service.NominationInPfService;
import com.onboarding.onboarding.util.NominationInPf;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/NominationInPf")
@CrossOrigin("*")
public class NominationInPfController {
	
	@Autowired
	private NominationInPfService NominationInPfService;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody NominationInPf pe) {
				
		NominationInPf save = this.NominationInPfService.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody NominationInPf pe) {
				
		NominationInPf save = this.NominationInPfService.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public NominationInPf getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		NominationInPf byUser = this.NominationInPfService.getByUser(user);

		return byUser;
	}

}
