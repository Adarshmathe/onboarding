package com.onboarding.onboarding.util;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class GroupTermInsurance {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Transient
	private String name;
	private String r1c2;
	private String r1c3;
	private String r1c4;
	@Temporal(TemporalType.DATE)
	private Date r1c5;
	private String r1c6;
	private String r1c7;
	private String r2c2;
	private String r2c3;
	private String r2c4;
	@Temporal(TemporalType.DATE)
	private Date r2c5;
	private String r2c6;
	private String r2c7;
	private String r3c2;
	private String r3c3;
	private String r3c4;
	@Temporal(TemporalType.DATE)
	private Date r3c5;
	private String r3c6;
	private String r3c7;
	private String r4c2;
	private String r4c3;
	private String r4c4;
	@Temporal(TemporalType.DATE)
	private Date r4c5;
	private String r4c6;
	private String r4c7;
	private String r5c2;
	private String r5c3;
	private String r5c4;
	@Temporal(TemporalType.DATE)
	private Date r5c5;
	private String r5c6;
	private String r5c7;
	private String r6c2;
	private String r6c3;
	private String r6c4;
	@Temporal(TemporalType.DATE)
	private Date r6c5;
	private String r6c6;
	private String r6c7;
	@Transient
	private String name1;
	private String name2;
	private String place;
	private String erp;
	@Transient
	private Date dob;
	@Transient
	private String sex;
	@Transient
	private String maritalstatus;
	@Transient
	private String address;
	@Temporal(TemporalType.DATE)
	private Date date;
	
	@OneToOne
	private User gtiuser;
	
	
	public User getGtiuser() {
		return gtiuser;
	}
	public void setGtiuser(User gtiuser) {
		this.gtiuser = gtiuser;
	}
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
	public String getR1c2() {
		return r1c2;
	}
	public void setR1c2(String r1c2) {
		this.r1c2 = r1c2;
	}
	public String getR1c3() {
		return r1c3;
	}
	public void setR1c3(String r1c3) {
		this.r1c3 = r1c3;
	}
	public String getR1c4() {
		return r1c4;
	}
	public void setR1c4(String r1c4) {
		this.r1c4 = r1c4;
	}

	public String getR1c6() {
		return r1c6;
	}
	public void setR1c6(String r1c6) {
		this.r1c6 = r1c6;
	}
	public String getR1c7() {
		return r1c7;
	}
	public void setR1c7(String r1c7) {
		this.r1c7 = r1c7;
	}
	public String getR2c2() {
		return r2c2;
	}
	public void setR2c2(String r2c2) {
		this.r2c2 = r2c2;
	}
	public String getR2c3() {
		return r2c3;
	}
	public void setR2c3(String r2c3) {
		this.r2c3 = r2c3;
	}
	public String getR2c4() {
		return r2c4;
	}
	public void setR2c4(String r2c4) {
		this.r2c4 = r2c4;
	}

	public String getR2c6() {
		return r2c6;
	}
	public void setR2c6(String r2c6) {
		this.r2c6 = r2c6;
	}
	public String getR2c7() {
		return r2c7;
	}
	public void setR2c7(String r2c7) {
		this.r2c7 = r2c7;
	}
	public String getR3c2() {
		return r3c2;
	}
	public void setR3c2(String r3c2) {
		this.r3c2 = r3c2;
	}
	public String getR3c3() {
		return r3c3;
	}
	public void setR3c3(String r3c3) {
		this.r3c3 = r3c3;
	}
	public String getR3c4() {
		return r3c4;
	}
	public void setR3c4(String r3c4) {
		this.r3c4 = r3c4;
	}

	public String getR3c6() {
		return r3c6;
	}
	public void setR3c6(String r3c6) {
		this.r3c6 = r3c6;
	}
	public String getR3c7() {
		return r3c7;
	}
	public void setR3c7(String r3c7) {
		this.r3c7 = r3c7;
	}
	public String getR4c2() {
		return r4c2;
	}
	public void setR4c2(String r4c2) {
		this.r4c2 = r4c2;
	}
	public String getR4c3() {
		return r4c3;
	}
	public void setR4c3(String r4c3) {
		this.r4c3 = r4c3;
	}
	public String getR4c4() {
		return r4c4;
	}
	public void setR4c4(String r4c4) {
		this.r4c4 = r4c4;
	}

	public String getR4c6() {
		return r4c6;
	}
	public void setR4c6(String r4c6) {
		this.r4c6 = r4c6;
	}
	public String getR4c7() {
		return r4c7;
	}
	public void setR4c7(String r4c7) {
		this.r4c7 = r4c7;
	}
	public String getR5c2() {
		return r5c2;
	}
	public void setR5c2(String r5c2) {
		this.r5c2 = r5c2;
	}
	public String getR5c3() {
		return r5c3;
	}
	public void setR5c3(String r5c3) {
		this.r5c3 = r5c3;
	}
	public String getR5c4() {
		return r5c4;
	}
	public void setR5c4(String r5c4) {
		this.r5c4 = r5c4;
	}

	public String getR5c6() {
		return r5c6;
	}
	public void setR5c6(String r5c6) {
		this.r5c6 = r5c6;
	}
	public String getR5c7() {
		return r5c7;
	}
	public void setR5c7(String r5c7) {
		this.r5c7 = r5c7;
	}
	public String getR6c2() {
		return r6c2;
	}
	public void setR6c2(String r6c2) {
		this.r6c2 = r6c2;
	}
	public String getR6c3() {
		return r6c3;
	}
	public void setR6c3(String r6c3) {
		this.r6c3 = r6c3;
	}
	public String getR6c4() {
		return r6c4;
	}
	public void setR6c4(String r6c4) {
		this.r6c4 = r6c4;
	}

	public String getR6c6() {
		return r6c6;
	}
	public void setR6c6(String r6c6) {
		this.r6c6 = r6c6;
	}
	public String getR6c7() {
		return r6c7;
	}
	public void setR6c7(String r6c7) {
		this.r6c7 = r6c7;
	}
	public String getName1() {
		return name1;
	}
	public void setName1(String name1) {
		this.name1 = name1;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getErp() {
		return erp;
	}
	public void setErp(String erp) {
		this.erp = erp;
	}

	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getMaritalstatus() {
		return maritalstatus;
	}
	public void setMaritalstatus(String maritalstatus) {
		this.maritalstatus = maritalstatus;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getName2() {
		return name2;
	}
	public void setName2(String name2) {
		this.name2 = name2;
	}
	public Date getR1c5() {
		return r1c5;
	}
	public void setR1c5(Date r1c5) {
		this.r1c5 = r1c5;
	}
	public Date getR2c5() {
		return r2c5;
	}
	public void setR2c5(Date r2c5) {
		this.r2c5 = r2c5;
	}
	public Date getR3c5() {
		return r3c5;
	}
	public void setR3c5(Date r3c5) {
		this.r3c5 = r3c5;
	}
	public Date getR4c5() {
		return r4c5;
	}
	public void setR4c5(Date r4c5) {
		this.r4c5 = r4c5;
	}
	public Date getR5c5() {
		return r5c5;
	}
	public void setR5c5(Date r5c5) {
		this.r5c5 = r5c5;
	}
	public Date getR6c5() {
		return r6c5;
	}
	public void setR6c5(Date r6c5) {
		this.r6c5 = r6c5;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}


	

}
