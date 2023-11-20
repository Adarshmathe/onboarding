package com.onboarding.onboarding.util;

import java.util.Date;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;


@Embeddable
public class Education {
	
	private String course;
	private String branch;
	private String school_Institute;
	private String board_university;
	@Temporal(TemporalType.DATE)
	private Date fromDate;
	@Temporal(TemporalType.DATE)
	private Date toDate;
	private String noOfYears;
	private String cgpa;
	@Transient
	private String file;
	@Transient
	private String filedata;
	private String filename;
	private String filetype;
	
	public String getCourse() {
		return course;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}

	
	
	
	public String getSchool_Institute() {
		return school_Institute;
	}
	public void setSchool_Institute(String school_Institute) {
		this.school_Institute = school_Institute;
	}
	public String getBoard_university() {
		return board_university;
	}
	public void setBoard_university(String board_university) {
		this.board_university = board_university;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public String getNoOfYears() {
		return noOfYears;
	}
	public void setNoOfYears(String noOfYears) {
		this.noOfYears = noOfYears;
	}

	public String getCgpa() {
		return cgpa;
	}
	public void setCgpa(String cgpa) {
		this.cgpa = cgpa;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public String getFiletype() {
		return filetype;
	}
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFiledata() {
		return filedata;
	}
	public void setFiledata(String filedata) {
		this.filedata = filedata;
	}
	




	
	
	

}
