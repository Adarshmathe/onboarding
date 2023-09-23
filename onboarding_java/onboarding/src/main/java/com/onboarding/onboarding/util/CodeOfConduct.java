package com.onboarding.onboarding.util;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class CodeOfConduct {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private boolean checkbox;
	
	@OneToOne
	private User cocuser;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public boolean isCheckbox() {
		return checkbox;
	}
	public void setCheckbox(boolean checkbox) {
		this.checkbox = checkbox;
	}
	public User getCocuser() {
		return cocuser;
	}
	public void setCocuser(User cocuser) {
		this.cocuser = cocuser;
	}

	
	
}
