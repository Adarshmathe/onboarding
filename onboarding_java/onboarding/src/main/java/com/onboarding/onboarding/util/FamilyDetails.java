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
public class FamilyDetails {
	
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private long id;

	@ElementCollection  
	private List<Family> extras = new ArrayList<Family>(); 
	
	@OneToOne
	private User fuser;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Family> getExtras() {
		return extras;
	}

	public void setExtras(List<Family> extras) {
		this.extras = extras;
	}

	public User getFuser() {
		return fuser;
	}

	public void setFuser(User fuser) {
		this.fuser = fuser;
	}
	
	
	
}
