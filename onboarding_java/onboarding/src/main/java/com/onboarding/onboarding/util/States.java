package com.onboarding.onboarding.util;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class States {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private Long id;
	private String name;
	
	@ManyToOne
	private Countries country;
	
	@OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, mappedBy = "state")
	@JsonIgnore
	private List<Cities> cities;
	
	@OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, mappedBy = "dstate")
	@JsonIgnore
	private List<Districts> districts;

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

	public Countries getCountry() {
		return country;
	}

	public void setCountry(Countries country) {
		this.country = country;
	}

	public List<Cities> getCities() {
		return cities;
	}

	public void setCities(List<Cities> cities) {
		this.cities = cities;
	}

	public List<Districts> getDistricts() {
		return districts;
	}

	public void setDistricts(List<Districts> districts) {
		this.districts = districts;
	}
	
	
	
}
