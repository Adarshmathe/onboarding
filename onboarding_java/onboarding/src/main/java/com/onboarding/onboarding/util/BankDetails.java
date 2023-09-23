package com.onboarding.onboarding.util;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;


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
