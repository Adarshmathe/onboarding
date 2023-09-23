package com.onboarding.onboarding.util;

import java.util.Date;

import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
@Embeddable
public class PassportDetails {
	
	public boolean isavailable ;
	public String passportNumber ;
	public String placeofissue ;
	public String issuingauth ;
	@Temporal(TemporalType.DATE)
	public Date dateofissue ;
	@Temporal(TemporalType.DATE)
	public Date dateofexpiry ;
    public String visibledismark ;
    public String phouseNo ;
    public String parea ;
    public String pcity ;
    public String pstate ;
    public String pdistrict ;
    public String ppostalcode ;
    @Transient
    public String passportfile;
    @Transient
    public String passportfiledata;
    public String passportfiletype;
    public String passportfilename;
    public Integer pstateid ;
    
    
    
	public Integer getPstateid() {
		return pstateid;
	}
	public void setPstateid(Integer pstateid) {
		this.pstateid = pstateid;
	}

	public boolean isIsavailable() {
		return isavailable;
	}
	public void setIsavailable(boolean isavailable) {
		this.isavailable = isavailable;
	}
	public String getPassportNumber() {
		return passportNumber;
	}
	public void setPassportNumber(String passportNumber) {
		this.passportNumber = passportNumber;
	}
	public String getPlaceofissue() {
		return placeofissue;
	}
	public void setPlaceofissue(String placeofissue) {
		this.placeofissue = placeofissue;
	}
	public String getIssuingauth() {
		return issuingauth;
	}
	public void setIssuingauth(String issuingauth) {
		this.issuingauth = issuingauth;
	}
	
	public Date getDateofissue() {
		return dateofissue;
	}
	public void setDateofissue(Date dateofissue) {
		this.dateofissue = dateofissue;
	}
	public Date getDateofexpiry() {
		return dateofexpiry;
	}
	public void setDateofexpiry(Date dateofexpiry) {
		this.dateofexpiry = dateofexpiry;
	}
	public String getVisibledismark() {
		return visibledismark;
	}
	public void setVisibledismark(String visibledismark) {
		this.visibledismark = visibledismark;
	}
	public String getPhouseNo() {
		return phouseNo;
	}
	public void setPhouseNo(String phouseNo) {
		this.phouseNo = phouseNo;
	}
	public String getParea() {
		return parea;
	}
	public void setParea(String parea) {
		this.parea = parea;
	}
	public String getPcity() {
		return pcity;
	}
	public void setPcity(String pcity) {
		this.pcity = pcity;
	}
	public String getPstate() {
		return pstate;
	}
	public void setPstate(String pstate) {
		this.pstate = pstate;
	}
	public String getPdistrict() {
		return pdistrict;
	}
	public void setPdistrict(String pdistrict) {
		this.pdistrict = pdistrict;
	}
	public String getPpostalcode() {
		return ppostalcode;
	}
	public void setPpostalcode(String ppostalcode) {
		this.ppostalcode = ppostalcode;
	}
	public String getPassportfile() {
		return passportfile;
	}
	public void setPassportfile(String passportfile) {
		this.passportfile = passportfile;
	}
	public String getPassportfiledata() {
		return passportfiledata;
	}
	public void setPassportfiledata(String passportfiledata) {
		this.passportfiledata = passportfiledata;
	}
	public String getPassportfiletype() {
		return passportfiletype;
	}
	public void setPassportfiletype(String passportfiletype) {
		this.passportfiletype = passportfiletype;
	}
	public String getPassportfilename() {
		return passportfilename;
	}
	public void setPassportfilename(String passportfilename) {
		this.passportfilename = passportfilename;
	}
	
	    
    
    
}
