package com.onboarding.onboarding.util;

import jakarta.persistence.Embeddable;

@Embeddable
public class PermanentAddress {

 private String houseNo;
 private String location ;
 private String city ;
 private String country ;
 private String state ;
 private String district ;
 private String postalCode ;
 private Integer countryid ;
 private Integer stateid ;

public String getHouseNo() {
	return houseNo;
}
public void setHouseNo(String houseNo) {
	this.houseNo = houseNo;
}
public String getLocation() {
	return location;
}
public void setLocation(String location) {
	this.location = location;
}
public String getCity() {
	return city;
}
public void setCity(String city) {
	this.city = city;
}
public String getCountry() {
	return country;
}
public void setCountry(String country) {
	this.country = country;
}
public String getState() {
	return state;
}
public void setState(String state) {
	this.state = state;
}
public String getDistrict() {
	return district;
}
public void setDistrict(String district) {
	this.district = district;
}
public String getPostalCode() {
	return postalCode;
}
public void setPostalCode(String postalCode) {
	this.postalCode = postalCode;
}
public Integer getCountryid() {
	return countryid;
}
public void setCountryid(Integer countryid) {
	this.countryid = countryid;
}
public Integer getStateid() {
	return stateid;
}
public void setStateid(Integer stateid) {
	this.stateid = stateid;
}	

}
