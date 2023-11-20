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
public class EduDetails {
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private long id;
	
	@ElementCollection  
	private List<Education> extras = new ArrayList<Education>();  ;
	
	@OneToOne
	private User eduuser;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Education> getExtras() {
		return extras;
	}

	public void setExtras(List<Education> extras) {
		this.extras = extras;
	}

	public User getEduuser() {
		return eduuser;
	}

	public void setEduuser(User eduuser) {
		this.eduuser = eduuser;
	}
	
	
	
}
