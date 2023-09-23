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
public class Gratuity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name3;
	@Transient
	private String name;
	 @Temporal(TemporalType.DATE)
	private Date name1;
	private String r1c1;
	private String r1c2;
	private String r1c3;
	private String r1c4;
	private String r2c1;
	private String r2c2;
	private String r2c3;
	private String r2c4;
	private String r3c1;
	private String r3c2;
	private String r3c3;
	private String r3c4;
	@Transient
	private String nameofemployee;
	@Transient
	private String sex;
	@Transient
	private String religion;
	@Transient
	private String ismarried;
	private String department;
	private String ticket;
	 @Temporal(TemporalType.DATE)
	private Date date;
	private String village;
	private String thana;
	private String subdivision;
	private String postoffice;
	@Transient
	private String district;
	@Transient
	private String state;
	 @Temporal(TemporalType.DATE)
	private Date date1;
	private String place1;
	private String witness1;
	private String witness2;
	 @Temporal(TemporalType.DATE)
	private Date date2;
	private String place2;
	 @Temporal(TemporalType.DATE)
	private Date date3;
	 @Temporal(TemporalType.DATE)
	private Date date4;
	@OneToOne
	private User guser;
	
	
	public User getGuser() {
		return guser;
	}
	public void setGuser(User guser) {
		this.guser = guser;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName3() {
		return name3;
	}
	public void setName3(String name3) {
		this.name3 = name3;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getR1c1() {
		return r1c1;
	}
	public void setR1c1(String r1c1) {
		this.r1c1 = r1c1;
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
	public String getR2c4() {
		return r2c4;
	}
	public void setR2c4(String r2c4) {
		this.r2c4 = r2c4;
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
	public String getR3c4() {
		return r3c4;
	}
	public void setR3c4(String r3c4) {
		this.r3c4 = r3c4;
	}
	public String getNameofemployee() {
		return nameofemployee;
	}
	public void setNameofemployee(String nameofemployee) {
		this.nameofemployee = nameofemployee;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getReligion() {
		return religion;
	}
	public void setReligion(String religion) {
		this.religion = religion;
	}
	public String getIsmarried() {
		return ismarried;
	}
	public void setIsmarried(String ismarried) {
		this.ismarried = ismarried;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getTicket() {
		return ticket;
	}
	public void setTicket(String ticket) {
		this.ticket = ticket;
	}

	public String getVillage() {
		return village;
	}
	public void setVillage(String village) {
		this.village = village;
	}
	public String getThana() {
		return thana;
	}
	public void setThana(String thana) {
		this.thana = thana;
	}
	public String getSubdivision() {
		return subdivision;
	}
	public void setSubdivision(String subdivision) {
		this.subdivision = subdivision;
	}
	public String getPostoffice() {
		return postoffice;
	}
	public void setPostoffice(String postoffice) {
		this.postoffice = postoffice;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}

	public String getPlace1() {
		return place1;
	}
	public void setPlace1(String place1) {
		this.place1 = place1;
	}
	public String getWitness1() {
		return witness1;
	}
	public void setWitness1(String witness1) {
		this.witness1 = witness1;
	}
	public String getWitness2() {
		return witness2;
	}
	public void setWitness2(String witness2) {
		this.witness2 = witness2;
	}

	public String getPlace2() {
		return place2;
	}
	public void setPlace2(String place2) {
		this.place2 = place2;
	}
	public Date getName1() {
		return name1;
	}
	public void setName1(Date name1) {
		this.name1 = name1;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
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
	public Date getDate3() {
		return date3;
	}
	public void setDate3(Date date3) {
		this.date3 = date3;
	}
	public Date getDate4() {
		return date4;
	}
	public void setDate4(Date date4) {
		this.date4 = date4;
	}




}
