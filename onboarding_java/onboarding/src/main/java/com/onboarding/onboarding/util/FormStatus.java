package com.onboarding.onboarding.util;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class FormStatus {
	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
	 private Long id;
	 private String Personal;
	 private String Family ;
	 private String Education;
	 private String Experience;
	 private String Bank;
	 private String Provident;
	 private String Gratuity;
	 private String EmployeeConfidentialityAgreement;
	 private String GroupMediclaim;
	 private String GroupTermInsurance;
	 private String NominationinPF;
	 private String CodeOfConduct;
	 
	 @OneToOne
	 private User formuser;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPersonal() {
		return Personal;
	}

	public void setPersonal(String personal) {
		Personal = personal;
	}

	public String getFamily() {
		return Family;
	}

	public void setFamily(String family) {
		Family = family;
	}

	public String getEducation() {
		return Education;
	}

	public void setEducation(String education) {
		Education = education;
	}

	public String getExperience() {
		return Experience;
	}

	public void setExperience(String experience) {
		Experience = experience;
	}

	public String getBank() {
		return Bank;
	}

	public void setBank(String bank) {
		Bank = bank;
	}

	public String getProvident() {
		return Provident;
	}

	public void setProvident(String provident) {
		Provident = provident;
	}

	public String getGratuity() {
		return Gratuity;
	}

	public void setGratuity(String gratuity) {
		Gratuity = gratuity;
	}

	public String getEmployeeConfidentialityAgreement() {
		return EmployeeConfidentialityAgreement;
	}

	public void setEmployeeConfidentialityAgreement(String employeeConfidentialityAgreement) {
		EmployeeConfidentialityAgreement = employeeConfidentialityAgreement;
	}

	public String getGroupMediclaim() {
		return GroupMediclaim;
	}

	public void setGroupMediclaim(String groupMediclaim) {
		GroupMediclaim = groupMediclaim;
	}

	public String getGroupTermInsurance() {
		return GroupTermInsurance;
	}

	public void setGroupTermInsurance(String groupTermInsurance) {
		GroupTermInsurance = groupTermInsurance;
	}

	public String getNominationinPF() {
		return NominationinPF;
	}

	public void setNominationinPF(String nominationinPF) {
		NominationinPF = nominationinPF;
	}

	public String getCodeOfConduct() {
		return CodeOfConduct;
	}

	public void setCodeOfConduct(String codeOfConduct) {
		CodeOfConduct = codeOfConduct;
	}

	public User getFormuser() {
		return formuser;
	}

	public void setFormuser(User formuser) {
		this.formuser = formuser;
	}


	 
	
}
