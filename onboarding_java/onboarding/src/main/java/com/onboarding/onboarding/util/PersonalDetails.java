package com.onboarding.onboarding.util;


import java.util.Date;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class PersonalDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String title;
	private String firstname;
	private String middlename;
	private String lastname;
	private String gender;
	@Temporal(TemporalType.DATE)
	private Date dob;
	private String nationality;
	private String language;
	private String maritalstatus;
	@Temporal(TemporalType.DATE)
	private Date marriagedate ;
	private String religion ;
	private String email ;
	private String contact ;
	private String exservicemen ;
	private String caste ;
	@Transient
    public String image;
    @Transient
    public String imagedata;
    public String imagedatatype;
    public String imagedataname;
    @Transient
    public String signature;
    @Transient
    public String signaturedata;
    public String signaturetype;
    public String signaturename;
	@Embedded
	private PermanentAddress permanentaddress;
	
	@Embedded
	private Currentaddress currentaddress ;
	@Embedded
	private PassportDetails passportDetails ;
	@Embedded
	private PanAndaadhar panAndaadhar ;
	
	@OneToOne
	private User user;
	
	public Currentaddress getCurrentaddress() {
		return currentaddress;
	}
	public void setCurrentaddress(Currentaddress currentaddress) {
		this.currentaddress = currentaddress;
	}
	public PassportDetails getPassportDetails() {
		return passportDetails;
	}
	public void setPassportDetails(PassportDetails passportDetails) {
		this.passportDetails = passportDetails;
	}
	public PanAndaadhar getPanAndaadhar() {
		return panAndaadhar;
	}
	public void setPanAndaadhar(PanAndaadhar panAndaadhar) {
		this.panAndaadhar = panAndaadhar;
	}


	

	
	
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getMiddlename() {
		return middlename;
	}
	public void setMiddlename(String middlename) {
		this.middlename = middlename;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getNationality() {
		return nationality;
	}
	public void setNationality(String nationality) {
		this.nationality = nationality;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getMaritalstatus() {
		return maritalstatus;
	}
	public void setMaritalstatus(String maritalstatus) {
		this.maritalstatus = maritalstatus;
	}

	public String getReligion() {
		return religion;
	}
	public void setReligion(String religion) {
		this.religion = religion;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getExservicemen() {
		return exservicemen;
	}
	public void setExservicemen(String exservicemen) {
		this.exservicemen = exservicemen;
	}
	public String getCaste() {
		return caste;
	}
	public void setCaste(String caste) {
		this.caste = caste;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public PermanentAddress getPermanentaddress() {
		return permanentaddress;
	}
	public void setPermanentaddress(PermanentAddress permanentaddress) {
		this.permanentaddress = permanentaddress;
	}
	public Date getMarriagedate() {
		return marriagedate;
	}
	public void setMarriagedate(Date marriagedate) {
		this.marriagedate = marriagedate;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getImagedata() {
		return imagedata;
	}
	public void setImagedata(String imagedata) {
		this.imagedata = imagedata;
	}
	public String getImagedatatype() {
		return imagedatatype;
	}
	public void setImagedatatype(String imagedatatype) {
		this.imagedatatype = imagedatatype;
	}
	public String getImagedataname() {
		return imagedataname;
	}
	public void setImagedataname(String imagedataname) {
		this.imagedataname = imagedataname;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public String getSignaturedata() {
		return signaturedata;
	}
	public void setSignaturedata(String signaturedata) {
		this.signaturedata = signaturedata;
	}
	public String getSignaturetype() {
		return signaturetype;
	}
	public void setSignaturetype(String signaturetype) {
		this.signaturetype = signaturetype;
	}
	public String getSignaturename() {
		return signaturename;
	}
	public void setSignaturename(String signaturename) {
		this.signaturename = signaturename;
	}



	
	
}
