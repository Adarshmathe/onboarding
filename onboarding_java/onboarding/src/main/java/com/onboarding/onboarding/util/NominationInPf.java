package com.onboarding.onboarding.util;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class NominationInPf {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(length = 100)
	@Transient
	private String name;
	@Column(length = 100)
	private String fathername;
	@Column(length = 100)
	@Transient
	private String surname;
	@Column(length = 100)
	@Transient
	private Date dob;
	@Column(length = 100)
	@Transient
	private String accountno;
	@Column(length = 100)
	@Transient
	private String sex;
	@Column(length = 100)
	@Transient
	private String marital;
	@Column(length = 100)
	@Transient
	private String address;
	@Column(length = 100)
	private String r2c1;
	@Column(length = 100)
	private String r2c2;
	@Column(length = 100)
	private String r2c3;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date r2c4;
	@Column(length = 100)
	private String r2c5;
	@Column(length = 100)
	private String r2c6;
	@Column(length = 100)
	private String r3c1;
	@Column(length = 100)
	private String r3c2;
	@Column(length = 100)
	private String r3c3;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date r3c4;
	@Column(length = 100)
	private String r3c5;
	@Column(length = 100)
	private String r3c6;
	@Column(length = 100)
	private String r4c1;
	@Column(length = 100)
	private String r4c2;
	@Column(length = 100)
	private String r4c3;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date r4c4;
	@Column(length = 100)
	private String r4c5;
	@Column(length = 100)
	private String r4c6;
	@Column(length = 100)
	private String r5c1;
	@Column(length = 100)
	private String r5c2;
	@Column(length = 100)
	private String r5c3;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date r5c4;
	@Column(length = 100)
	private String r5c5;
	@Column(length = 100)
	private String r5c6;
	@Column(length = 100)
	private String r6c1;
	@Column(length = 100)
	private String r6c2;
	@Column(length = 100)
	private String r6c3;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date r6c4;
	@Column(length = 100)
	private String r6c5;
	@Column(length = 100)
	private String r6c6;
	@Column(length = 100)
	private String t1r2c1;
	@Column(length = 100)
	private String t1r2c2;
	@Column(length = 100)
	private String t1r2c3;
	@Column(length = 100)
	private String t1r2c4;
	@Column(length = 100)
	private String t1r3c1;
	@Column(length = 100)
	private String t1r3c2;
	@Column(length = 100)
	private String t1r3c3;
	@Column(length = 100)
	private String t1r3c4;
	@Column(length = 100)
	private String t1r4c1;
	@Column(length = 100)
	private String t1r4c2;
	@Column(length = 100)
	private String t1r4c3;
	@Column(length = 100)
	private String t1r4c4;
	@Column(length = 100)
	private String t1r5c1;
	@Column(length = 100)
	private String t1r5c2;
	@Column(length = 100)
	private String t1r5c3;
	@Column(length = 100)
	private String t1r5c4;
	@Column(length = 100)
	private String t1r6c1;
	@Column(length = 100)
	private String t1r6c2;
	@Column(length = 100)
	private String t1r6c3;
	@Column(length = 100)
	private String t1r6c4;
	@Column(length = 100)
	private String t2r1c1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date t2r1c2;
	@Column(length = 100)
	private String t2r1c3;
	@Column(length = 100)
	private String t2r2c1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date t2r2c2;
	@Column(length = 100)
	private String t2r2c3;
	@Column(length = 100)
	private String t2r3c1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date t2r3c2;
	@Column(length = 100)
	private String t2r3c3;
	@Column(length = 100)
	private String t2r4c1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date t2r4c2;
	@Column(length = 100)
	private String t2r4c3;
	@Column(length = 100)
	private String t2r5c1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date t2r5c2;
	@Column(length = 100)
	private String t2r5c3;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date date;
	@Column(length = 100)
	private String name1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date date1;
	@Column(length = 100)
	 @Temporal(TemporalType.DATE)
	private Date date2;
	@Column(length = 100)
	private String place;

	
	@OneToOne
	private User nuser;
	
	
	public User getNuser() {
		return nuser;
	}
	public void setNuser(User nuser) {
		this.nuser = nuser;
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
	public String getFathername() {
		return fathername;
	}
	public void setFathername(String fathername) {
		this.fathername = fathername;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getName1() {
		return name1;
	}
	public void setName1(String name1) {
		this.name1 = name1;
	}

	
	public String getAccountno() {
		return accountno;
	}
	public void setAccountno(String accountno) {
		this.accountno = accountno;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getMarital() {
		return marital;
	}
	public void setMarital(String marital) {
		this.marital = marital;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getR2c1() {
		return r2c1;
	}
	public void setR2c1(String r2c1) {
		this.r2c1 = r2c1;
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

	public String getR2c5() {
		return r2c5;
	}
	public void setR2c5(String r2c5) {
		this.r2c5 = r2c5;
	}
	public String getR2c6() {
		return r2c6;
	}
	public void setR2c6(String r2c6) {
		this.r2c6 = r2c6;
	}
	public String getR3c1() {
		return r3c1;
	}
	public void setR3c1(String r3c1) {
		this.r3c1 = r3c1;
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
	
	public String getR3c5() {
		return r3c5;
	}
	public void setR3c5(String r3c5) {
		this.r3c5 = r3c5;
	}
	public String getR3c6() {
		return r3c6;
	}
	public void setR3c6(String r3c6) {
		this.r3c6 = r3c6;
	}
	public String getR4c1() {
		return r4c1;
	}
	public void setR4c1(String r4c1) {
		this.r4c1 = r4c1;
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

	public String getR4c5() {
		return r4c5;
	}
	public void setR4c5(String r4c5) {
		this.r4c5 = r4c5;
	}
	public String getR4c6() {
		return r4c6;
	}
	public void setR4c6(String r4c6) {
		this.r4c6 = r4c6;
	}
	public String getR5c1() {
		return r5c1;
	}
	public void setR5c1(String r5c1) {
		this.r5c1 = r5c1;
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

	public String getR5c5() {
		return r5c5;
	}
	public void setR5c5(String r5c5) {
		this.r5c5 = r5c5;
	}
	public String getR5c6() {
		return r5c6;
	}
	public void setR5c6(String r5c6) {
		this.r5c6 = r5c6;
	}
	public String getR6c1() {
		return r6c1;
	}
	public void setR6c1(String r6c1) {
		this.r6c1 = r6c1;
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

	public String getR6c5() {
		return r6c5;
	}
	public void setR6c5(String r6c5) {
		this.r6c5 = r6c5;
	}
	public String getR6c6() {
		return r6c6;
	}
	public void setR6c6(String r6c6) {
		this.r6c6 = r6c6;
	}
	public String getT1r2c1() {
		return t1r2c1;
	}
	public void setT1r2c1(String t1r2c1) {
		this.t1r2c1 = t1r2c1;
	}
	public String getT1r2c2() {
		return t1r2c2;
	}
	public void setT1r2c2(String t1r2c2) {
		this.t1r2c2 = t1r2c2;
	}
	public String getT1r2c3() {
		return t1r2c3;
	}
	public void setT1r2c3(String t1r2c3) {
		this.t1r2c3 = t1r2c3;
	}
	public String getT1r2c4() {
		return t1r2c4;
	}
	public void setT1r2c4(String t1r2c4) {
		this.t1r2c4 = t1r2c4;
	}
	public String getT1r3c1() {
		return t1r3c1;
	}
	public void setT1r3c1(String t1r3c1) {
		this.t1r3c1 = t1r3c1;
	}
	public String getT1r3c2() {
		return t1r3c2;
	}
	public void setT1r3c2(String t1r3c2) {
		this.t1r3c2 = t1r3c2;
	}
	public String getT1r3c3() {
		return t1r3c3;
	}
	public void setT1r3c3(String t1r3c3) {
		this.t1r3c3 = t1r3c3;
	}
	public String getT1r3c4() {
		return t1r3c4;
	}
	public void setT1r3c4(String t1r3c4) {
		this.t1r3c4 = t1r3c4;
	}
	public String getT1r4c1() {
		return t1r4c1;
	}
	public void setT1r4c1(String t1r4c1) {
		this.t1r4c1 = t1r4c1;
	}
	public String getT1r4c2() {
		return t1r4c2;
	}
	public void setT1r4c2(String t1r4c2) {
		this.t1r4c2 = t1r4c2;
	}
	public String getT1r4c3() {
		return t1r4c3;
	}
	public void setT1r4c3(String t1r4c3) {
		this.t1r4c3 = t1r4c3;
	}
	public String getT1r4c4() {
		return t1r4c4;
	}
	public void setT1r4c4(String t1r4c4) {
		this.t1r4c4 = t1r4c4;
	}

	public String getT1r5c1() {
		return t1r5c1;
	}
	public void setT1r5c1(String t1r5c1) {
		this.t1r5c1 = t1r5c1;
	}
	public String getT1r5c2() {
		return t1r5c2;
	}
	public void setT1r5c2(String t1r5c2) {
		this.t1r5c2 = t1r5c2;
	}
	public String getT1r5c3() {
		return t1r5c3;
	}
	public void setT1r5c3(String t1r5c3) {
		this.t1r5c3 = t1r5c3;
	}
	public String getT1r5c4() {
		return t1r5c4;
	}
	public void setT1r5c4(String t1r5c4) {
		this.t1r5c4 = t1r5c4;
	}
	public String getT1r6c1() {
		return t1r6c1;
	}
	public void setT1r6c1(String t1r6c1) {
		this.t1r6c1 = t1r6c1;
	}
	public String getT1r6c2() {
		return t1r6c2;
	}
	public void setT1r6c2(String t1r6c2) {
		this.t1r6c2 = t1r6c2;
	}
	public String getT1r6c3() {
		return t1r6c3;
	}
	public void setT1r6c3(String t1r6c3) {
		this.t1r6c3 = t1r6c3;
	}
	public String getT1r6c4() {
		return t1r6c4;
	}
	public void setT1r6c4(String t1r6c4) {
		this.t1r6c4 = t1r6c4;
	}
	public String getT2r1c1() {
		return t2r1c1;
	}
	public void setT2r1c1(String t2r1c1) {
		this.t2r1c1 = t2r1c1;
	}

	public String getT2r1c3() {
		return t2r1c3;
	}
	public void setT2r1c3(String t2r1c3) {
		this.t2r1c3 = t2r1c3;
	}
	public String getT2r2c1() {
		return t2r2c1;
	}
	public void setT2r2c1(String t2r2c1) {
		this.t2r2c1 = t2r2c1;
	}

	public String getT2r2c3() {
		return t2r2c3;
	}
	public void setT2r2c3(String t2r2c3) {
		this.t2r2c3 = t2r2c3;
	}
	public String getT2r3c1() {
		return t2r3c1;
	}
	public void setT2r3c1(String t2r3c1) {
		this.t2r3c1 = t2r3c1;
	}

	public String getT2r3c3() {
		return t2r3c3;
	}
	public void setT2r3c3(String t2r3c3) {
		this.t2r3c3 = t2r3c3;
	}
	public String getT2r4c1() {
		return t2r4c1;
	}
	public void setT2r4c1(String t2r4c1) {
		this.t2r4c1 = t2r4c1;
	}

	public String getT2r4c3() {
		return t2r4c3;
	}
	public void setT2r4c3(String t2r4c3) {
		this.t2r4c3 = t2r4c3;
	}
	public String getT2r5c1() {
		return t2r5c1;
	}
	public void setT2r5c1(String t2r5c1) {
		this.t2r5c1 = t2r5c1;
	}

	public String getT2r5c3() {
		return t2r5c3;
	}
	public void setT2r5c3(String t2r5c3) {
		this.t2r5c3 = t2r5c3;
	}

	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Date getR2c4() {
		return r2c4;
	}
	public void setR2c4(Date r2c4) {
		this.r2c4 = r2c4;
	}
	public Date getR3c4() {
		return r3c4;
	}
	public void setR3c4(Date r3c4) {
		this.r3c4 = r3c4;
	}
	public Date getR4c4() {
		return r4c4;
	}
	public void setR4c4(Date r4c4) {
		this.r4c4 = r4c4;
	}
	public Date getR5c4() {
		return r5c4;
	}
	public void setR5c4(Date r5c4) {
		this.r5c4 = r5c4;
	}
	public Date getR6c4() {
		return r6c4;
	}
	public void setR6c4(Date r6c4) {
		this.r6c4 = r6c4;
	}
	public Date getT2r1c2() {
		return t2r1c2;
	}
	public void setT2r1c2(Date t2r1c2) {
		this.t2r1c2 = t2r1c2;
	}
	public Date getT2r2c2() {
		return t2r2c2;
	}
	public void setT2r2c2(Date t2r2c2) {
		this.t2r2c2 = t2r2c2;
	}
	public Date getT2r3c2() {
		return t2r3c2;
	}
	public void setT2r3c2(Date t2r3c2) {
		this.t2r3c2 = t2r3c2;
	}
	public Date getT2r4c2() {
		return t2r4c2;
	}
	public void setT2r4c2(Date t2r4c2) {
		this.t2r4c2 = t2r4c2;
	}
	public Date getT2r5c2() {
		return t2r5c2;
	}
	public void setT2r5c2(Date t2r5c2) {
		this.t2r5c2 = t2r5c2;
	}
	public Date getDate1() {
		return date1;
	}
	public void setDate1(Date date1) {
		this.date1 = date1;
	}
	public Date getDate2() {
		return date2;
	}
	public void setDate2(Date date2) {
		this.date2 = date2;
	}
	
	
	


}
