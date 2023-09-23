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
public class EmployeeConfedentialAgreement {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	 @Temporal(TemporalType.DATE)
	private Date name;
	private String empno;
	private String name4;
	private String age;
	private String resident;
	private String name1;
	private String office;
	 @Temporal(TemporalType.DATE)
	private Date joiningdate;
	 @Temporal(TemporalType.DATE)
	private Date appointmentdate;
	private String name2;
	private String employee;
	private String witness;
	private String name3;
	private String title;
	@Transient
	private String title1;
	
	@OneToOne
	private User ecauser;
	
	
	public User getEcauser() {
		return ecauser;
	}
	public void setEcauser(User ecauser) {
		this.ecauser = ecauser;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	public String getEmpno() {
		return empno;
	}
	public void setEmpno(String empno) {
		this.empno = empno;
	}
	
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getResident() {
		return resident;
	}
	public void setResident(String resident) {
		this.resident = resident;
	}
	public String getName1() {
		return name1;
	}
	public void setName1(String name1) {
		this.name1 = name1;
	}
	public String getOffice() {
		return office;
	}
	public void setOffice(String office) {
		this.office = office;
	}

	public String getName2() {
		return name2;
	}
	public void setName2(String name2) {
		this.name2 = name2;
	}
	public String getEmployee() {
		return employee;
	}
	public void setEmployee(String employee) {
		this.employee = employee;
	}
	public String getWitness() {
		return witness;
	}
	public void setWitness(String witness) {
		this.witness = witness;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getName3() {
		return name3;
	}
	public void setName3(String name3) {
		this.name3 = name3;
	}
	public String getName4() {
		return name4;
	}
	public void setName4(String name4) {
		this.name4 = name4;
	}
	public String getTitle1() {
		return title1;
	}
	public void setTitle1(String title1) {
		this.title1 = title1;
	}
	public Date getName() {
		return name;
	}
	public void setName(Date name) {
		this.name = name;
	}
	public Date getJoiningdate() {
		return joiningdate;
	}
	public void setJoiningdate(Date joiningdate) {
		this.joiningdate = joiningdate;
	}
	public Date getAppointmentdate() {
		return appointmentdate;
	}
	public void setAppointmentdate(Date appointmentdate) {
		this.appointmentdate = appointmentdate;
	}
	
	


}
