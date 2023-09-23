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
public class ExpDetails{
	@Id  
	@GeneratedValue(strategy=GenerationType.AUTO)  
	private long id;
	
	@ElementCollection  
	private List<Experience> extras = new ArrayList<Experience>();
	
	@OneToOne
	private User euser;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public List<Experience> getExtras() {
		return extras;
	}
	public void setExtras(List<Experience> extras) {
		this.extras = extras;
	}

	public User getEuser() {
		return euser;
	}
	public void setEuser(User euser) {
		this.euser = euser;
	}
	
	@Override
	public String toString() {
		return "ExpDetails [id=" + id + ", extras=" + extras + ", euser=" + euser + "]";
	}
	public ExpDetails(long id, List<Experience> extras, User euser) {
		super();
		this.id = id;
		this.extras = extras;
		this.euser = euser;
	}
	public ExpDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
