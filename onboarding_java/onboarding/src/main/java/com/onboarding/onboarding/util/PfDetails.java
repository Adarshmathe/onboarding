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
public class PfDetails {
	  @Id
	  @GeneratedValue(strategy = GenerationType.AUTO)
	  private Long id;
	  @Transient
	  private String name;
	  private String checkboxname;
	  private String checkboxvalue;
	  @Transient
	  private Date dob;
	  @Transient
	  private String Gender;
	  @Transient
	  private String maritalstatus;
	  @Transient
	  private String emailid;
	  @Transient
	  private String mobile;
	  private String providentfundscheme;
	  private String pensionscheme;
	  private String uan;
	  private String previouspfno;
	  @Temporal(TemporalType.DATE)
	  private Date dateofexit;
	  private String schemecertno;
	  private String ppo;
	  private String internationalworker;
	  private String country;
	  @Transient
	  private String passportno;
	  @Transient
	  private String validity;
	  @Transient
	  private String bankaccountandifsc;
	  @Transient
	  private String aadharcard;
	  @Transient
	  private String panno;  
	  private String empcode;
	  private String company;
	  @Temporal(TemporalType.DATE)
	  private Date date;
	  private String place;
	  @Temporal(TemporalType.DATE)
	  private Date date1;
	  private String name1;
	  @Temporal(TemporalType.DATE)
	  private Date date3;
	  private String pfno;
	  private String uan1;
	  private String checkbox1;
	  private String checkbox2;
	  
		@OneToOne
		private User pfuser;

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

		public String getCheckboxname() {
			return checkboxname;
		}

		public void setCheckboxname(String checkboxname) {
			this.checkboxname = checkboxname;
		}

		public String getCheckboxvalue() {
			return checkboxvalue;
		}

		public void setCheckboxvalue(String checkboxvalue) {
			this.checkboxvalue = checkboxvalue;
		}

		

		public String getGender() {
			return Gender;
		}

		public void setGender(String gender) {
			Gender = gender;
		}

		public String getMaritalstatus() {
			return maritalstatus;
		}

		public void setMaritalstatus(String maritalstatus) {
			this.maritalstatus = maritalstatus;
		}

		public String getEmailid() {
			return emailid;
		}

		public void setEmailid(String emailid) {
			this.emailid = emailid;
		}

		public String getMobile() {
			return mobile;
		}

		public void setMobile(String mobile) {
			this.mobile = mobile;
		}

		public String getProvidentfundscheme() {
			return providentfundscheme;
		}

		public void setProvidentfundscheme(String providentfundscheme) {
			this.providentfundscheme = providentfundscheme;
		}

		public String getPensionscheme() {
			return pensionscheme;
		}

		public void setPensionscheme(String pensionscheme) {
			this.pensionscheme = pensionscheme;
		}

		public String getUan() {
			return uan;
		}

		public void setUan(String uan) {
			this.uan = uan;
		}

		public String getPreviouspfno() {
			return previouspfno;
		}

		public void setPreviouspfno(String previouspfno) {
			this.previouspfno = previouspfno;
		}

	

		public String getSchemecertno() {
			return schemecertno;
		}

		public void setSchemecertno(String schemecertno) {
			this.schemecertno = schemecertno;
		}

		public String getPpo() {
			return ppo;
		}

		public void setPpo(String ppo) {
			this.ppo = ppo;
		}

		public String getInternationalworker() {
			return internationalworker;
		}

		public void setInternationalworker(String internationalworker) {
			this.internationalworker = internationalworker;
		}

		public String getCountry() {
			return country;
		}

		public void setCountry(String country) {
			this.country = country;
		}

		public String getPassportno() {
			return passportno;
		}

		public void setPassportno(String passportno) {
			this.passportno = passportno;
		}

		public String getValidity() {
			return validity;
		}

		public void setValidity(String validity) {
			this.validity = validity;
		}

		public String getBankaccountandifsc() {
			return bankaccountandifsc;
		}

		public void setBankaccountandifsc(String bankaccountandifsc) {
			this.bankaccountandifsc = bankaccountandifsc;
		}

		public String getAadharcard() {
			return aadharcard;
		}

		public void setAadharcard(String aadharcard) {
			this.aadharcard = aadharcard;
		}

		public String getPanno() {
			return panno;
		}

		public void setPanno(String panno) {
			this.panno = panno;
		}

		public String getEmpcode() {
			return empcode;
		}

		public void setEmpcode(String empcode) {
			this.empcode = empcode;
		}

		public String getCompany() {
			return company;
		}

		public void setCompany(String company) {
			this.company = company;
		}

	

		public String getPlace() {
			return place;
		}

		public void setPlace(String place) {
			this.place = place;
		}

	

		public String getName1() {
			return name1;
		}

		public void setName1(String name1) {
			this.name1 = name1;
		}

	

		public String getPfno() {
			return pfno;
		}

		public void setPfno(String pfno) {
			this.pfno = pfno;
		}

		public String getUan1() {
			return uan1;
		}

		public void setUan1(String uan1) {
			this.uan1 = uan1;
		}

		public String getCheckbox1() {
			return checkbox1;
		}

		public void setCheckbox1(String checkbox1) {
			this.checkbox1 = checkbox1;
		}

		public String getCheckbox2() {
			return checkbox2;
		}

		public void setCheckbox2(String checkbox2) {
			this.checkbox2 = checkbox2;
		}

		public User getPfuser() {
			return pfuser;
		}

		public void setPfuser(User pfuser) {
			this.pfuser = pfuser;
		}

		public Date getDob() {
			return dob;
		}

		public void setDob(Date dob) {
			this.dob = dob;
		}

		public Date getDateofexit() {
			return dateofexit;
		}

		public void setDateofexit(Date dateofexit) {
			this.dateofexit = dateofexit;
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

		public Date getDate3() {
			return date3;
		}

		public void setDate3(Date date3) {
			this.date3 = date3;
		}
	  

}
