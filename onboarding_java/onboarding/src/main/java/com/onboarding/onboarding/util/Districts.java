package com.onboarding.onboarding.util;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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
