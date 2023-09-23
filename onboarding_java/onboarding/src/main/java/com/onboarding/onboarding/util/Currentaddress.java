package com.onboarding.onboarding.util;

import javax.persistence.Embeddable;

@Embeddable
public class Currentaddress {
	 private String chouseNo;
	 private String clocation ;
	 private String ccity ;
	 private String ccountry ;
	 private String cstate ;
	 private String cdistrict ;
	 private String cpostalCode ;
	 
	 private Integer ccountryid ;
	 private Integer cstateid ;

	public String getChouseNo() {
		return chouseNo;
	}
	public void setChouseNo(String chouseNo) {
		this.chouseNo = chouseNo;
	}
	public String getClocation() {
		return clocation;
	}
	public void setClocation(String clocation) {
		this.clocation = clocation;
	}
	public String getCcity() {
		return ccity;
	}
	public void setCcity(String ccity) {
		this.ccity = ccity;
	}
	public String getCcountry() {
		return ccountry;
	}
	public void setCcountry(String ccountry) {
		this.ccountry = ccountry;
	}
	public String getCstate() {
		return cstate;
	}
	public void setCstate(String cstate) {
		this.cstate = cstate;
	}
	public String getCdistrict() {
		return cdistrict;
	}
	public void setCdistrict(String cdistrict) {
		this.cdistrict = cdistrict;
	}
	public String getCpostalCode() {
		return cpostalCode;
	}
	public void setCpostalCode(String cpostalCode) {
		this.cpostalCode = cpostalCode;
	}
	public Integer getCcountryid() {
		return ccountryid;
	}
	public void setCcountryid(Integer ccountryid) {
		this.ccountryid = ccountryid;
	}
	public Integer getCstateid() {
		return cstateid;
	}
	public void setCstateid(Integer cstateid) {
		this.cstateid = cstateid;
	}		
	
	
}
