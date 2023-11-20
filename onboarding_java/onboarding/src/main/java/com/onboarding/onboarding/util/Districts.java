package com.onboarding.onboarding.util;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Districts {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private Long id;
	private String name;
	
	@ManyToOne
	private States dstate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public States getDstate() {
		return dstate;
	}

	public void setDstate(States dstate) {
		this.dstate = dstate;
	}
	
	
	
}
