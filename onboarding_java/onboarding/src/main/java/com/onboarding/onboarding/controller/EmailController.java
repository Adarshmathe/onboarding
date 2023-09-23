package com.onboarding.onboarding.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.onboarding.onboarding.util.EmailEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onboarding.onboarding.service.impl.EmailService;


@RestController
@CrossOrigin("*")
@RequestMapping("/email")
public class EmailController {

	@Autowired
	private EmailService emailservice;
	
	
	@PostMapping(value = "/send" , consumes = {MediaType.APPLICATION_JSON_VALUE,MediaType.MULTIPART_FORM_DATA_VALUE})
	public  ResponseEntity<?> sendotp(@RequestPart("emaildata") String emaildata,@RequestPart(value="file",required=false) MultipartFile file) throws Exception {
		
		EmailEntity emailJson = emailservice.getJson(emaildata);
		
//		System.out.println("part" +file.getOriginalFilename());
		//send otp to email...

	   this.emailservice.sendEmail(emailJson.getTo(), emailJson.getSubject(), emailJson.getMessage(),file);
	   return ResponseEntity.ok("Email sent successfully");
	}
	
	
	}

