package com.onboarding.onboarding.util;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;



@Entity
public class BankDetails {
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private long id;

	@ElementCollection  
	private List<Bank> extras = new ArrayList<Bank>(); 
	
	@OneToOne
	private User buser;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Bank> getExtras() {
		return extras;
	}

	public void setExtras(List<Bank> extras) {
		this.extras = extras;
	}

	public User getBuser() {
		return buser;
	}

	public void setBuser(User buser) {
		this.buser = buser;
	}
	
	
	
}
