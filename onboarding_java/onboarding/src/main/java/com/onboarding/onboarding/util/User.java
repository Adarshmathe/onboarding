package com.onboarding.onboarding.util;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
@SuppressWarnings("serial")
@Entity
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private String password;
	private String email;
	private String mobile;
	private String role;
	private String image;
	private boolean enabled = true;
	@Temporal(TemporalType.DATE)
	private Date createdOn;
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	@JsonIgnore
	private Set<UserRole>userRoles = new HashSet<>();

	@OneToOne(cascade = CascadeType.ALL,mappedBy = "user")
	@JsonIgnore
	private PersonalDetails personalDetails;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "euser",fetch = FetchType.LAZY)
	@JsonIgnore
	private ExpDetails expDetails;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "eduuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private EduDetails eduDetails;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "buser",fetch = FetchType.LAZY)
	@JsonIgnore
	private BankDetails bankdetails;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "fuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private FamilyDetails familyDetails;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "pfuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private PfDetails pfdetails;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "guser",fetch = FetchType.LAZY)
	@JsonIgnore
	private Gratuity gratuity;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "gtiuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private GroupTermInsurance groupTermInsurance;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "muser",fetch = FetchType.LAZY)
	@JsonIgnore
	private Mediclaim mediclaim;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "ecauser",fetch = FetchType.LAZY)
	@JsonIgnore
	private EmployeeConfedentialAgreement employeeConfedentialAgreement;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "nuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private NominationInPf nominationInPf;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "cocuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private CodeOfConduct codeOfConduct;
	
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "formuser",fetch = FetchType.LAZY)
	@JsonIgnore
	private FormStatus formStatus;

	public Date getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}
	public Gratuity getGratuity() {
		return gratuity;
	}
	public void setGratuity(Gratuity gratuity) {
		this.gratuity = gratuity;
	}
	public GroupTermInsurance getGroupTermInsurance() {
		return groupTermInsurance;
	}
	public void setGroupTermInsurance(GroupTermInsurance groupTermInsurance) {
		this.groupTermInsurance = groupTermInsurance;
	}
	public Mediclaim getMediclaim() {
		return mediclaim;
	}
	public void setMediclaim(Mediclaim mediclaim) {
		this.mediclaim = mediclaim;
	}
	public EmployeeConfedentialAgreement getEmployeeConfedentialAgreement() {
		return employeeConfedentialAgreement;
	}
	public void setEmployeeConfedentialAgreement(EmployeeConfedentialAgreement employeeConfedentialAgreement) {
		this.employeeConfedentialAgreement = employeeConfedentialAgreement;
	}
	public NominationInPf getNominationInPf() {
		return nominationInPf;
	}
	public void setNominationInPf(NominationInPf nominationInPf) {
		this.nominationInPf = nominationInPf;
	}
	public PfDetails getPfdetails() {
		return pfdetails;
	}
	public void setPfdetails(PfDetails pfdetails) {
		this.pfdetails = pfdetails;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public Set<UserRole> getUserRoles() {
		return userRoles;
	}
	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		
		Set<Authority> set= new HashSet<>();
		
		this.userRoles.forEach(userRole -> {
			set.add(new Authority(userRole.getRole().getRoleName()));
		});
		
		return set;
	}


	public ExpDetails getExpDetails() {
		return expDetails;
	}


	public void setExpDetails(ExpDetails expDetails) {
		this.expDetails = expDetails;
	}
	
	
	


	public FormStatus getFormStatus() {
		return formStatus;
	}
	public void setFormStatus(FormStatus formStatus) {
		this.formStatus = formStatus;
	}
	public EduDetails getEduDetails() {
		return eduDetails;
	}
	public void setEduDetails(EduDetails eduDetails) {
		this.eduDetails = eduDetails;
	}
	public BankDetails getBankdetails() {
		return bankdetails;
	}
	public void setBankdetails(BankDetails bankdetails) {
		this.bankdetails = bankdetails;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	public PersonalDetails getPersonalDetails() {
		return personalDetails;
	}
	public void setPersonalDetails(PersonalDetails personalDetails) {
		this.personalDetails = personalDetails;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}
	public CodeOfConduct getCodeOfConduct() {
		return codeOfConduct;
	}
	public void setCodeOfConduct(CodeOfConduct codeOfConduct) {
		this.codeOfConduct = codeOfConduct;
	}
	public FamilyDetails getFamilyDetails() {
		return familyDetails;
	}
	public void setFamilyDetails(FamilyDetails familyDetails) {
		this.familyDetails = familyDetails;
	}
	


}
