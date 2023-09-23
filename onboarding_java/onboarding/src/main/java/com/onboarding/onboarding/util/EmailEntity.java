package com.onboarding.onboarding.util;

import org.springframework.web.multipart.MultipartFile;

public class EmailEntity {
	private String to;
	private String message;
	private String subject;
//	public MultipartFile file;
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}






	
}
