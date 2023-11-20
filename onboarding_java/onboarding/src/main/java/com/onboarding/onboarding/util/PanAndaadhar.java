package com.onboarding.onboarding.util;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;

@Embeddable
public class PanAndaadhar {
	public String panNumber;
	public String confirmpanNumber;
	@Transient
	public String pancardfile;
	@Transient
	public String pancardfiledata;
	public String pancardfiletype;
	public String pancardfilename;
	
	public String aadharNumber;
	public String confirmaadharNumber;
	@Transient
	public String aadharcardfile;
	@Transient
	public String aadharcardfiledata;
	public String aadharcardfiletype;
	public String aadharcardfilename;
	public String getPanNumber() {
		return panNumber;
	}
	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}
	public String getConfirmpanNumber() {
		return confirmpanNumber;
	}
	public void setConfirmpanNumber(String confirmpanNumber) {
		this.confirmpanNumber = confirmpanNumber;
	}
	public String getAadharNumber() {
		return aadharNumber;
	}
	public void setAadharNumber(String aadharNumber) {
		this.aadharNumber = aadharNumber;
	}
	public String getConfirmaadharNumber() {
		return confirmaadharNumber;
	}
	public void setConfirmaadharNumber(String confirmaadharNumber) {
		this.confirmaadharNumber = confirmaadharNumber;
	}
	public String getPancardfile() {
		return pancardfile;
	}
	public void setPancardfile(String pancardfile) {
		this.pancardfile = pancardfile;
	}
	public String getPancardfiledata() {
		return pancardfiledata;
	}
	public void setPancardfiledata(String pancardfiledata) {
		this.pancardfiledata = pancardfiledata;
	}
	public String getPancardfiletype() {
		return pancardfiletype;
	}
	public void setPancardfiletype(String pancardfiletype) {
		this.pancardfiletype = pancardfiletype;
	}
	public String getPancardfilename() {
		return pancardfilename;
	}
	public void setPancardfilename(String pancardfilename) {
		this.pancardfilename = pancardfilename;
	}
	public String getAadharcardfile() {
		return aadharcardfile;
	}
	public void setAadharcardfile(String aadharcardfile) {
		this.aadharcardfile = aadharcardfile;
	}
	public String getAadharcardfiledata() {
		return aadharcardfiledata;
	}
	public void setAadharcardfiledata(String aadharcardfiledata) {
		this.aadharcardfiledata = aadharcardfiledata;
	}
	public String getAadharcardfiletype() {
		return aadharcardfiletype;
	}
	public void setAadharcardfiletype(String aadharcardfiletype) {
		this.aadharcardfiletype = aadharcardfiletype;
	}
	public String getAadharcardfilename() {
		return aadharcardfilename;
	}
	public void setAadharcardfilename(String aadharcardfilename) {
		this.aadharcardfilename = aadharcardfilename;
	}

	
}
