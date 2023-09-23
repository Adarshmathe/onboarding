package com.onboarding.onboarding.util;

import javax.persistence.Embeddable;
import javax.persistence.Transient;
@Embeddable
public class Bank {
	
	private String bankname;
	private String branchname;
	private String bankaccountno;
	@Transient
	private String confirmbankaccountno;
	private String ifsccode;
	@Transient
	private String confirmifsccode;
	private String bankaddress;
	@Transient
	public String file;
	@Transient
	public String filedata;
	public String filename;
	public String filetype;
	public String getBankname() {
		return bankname;
	}
	public void setBankname(String bankname) {
		this.bankname = bankname;
	}
	public String getBranchname() {
		return branchname;
	}
	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}
	public String getBankaccountno() {
		return bankaccountno;
	}
	public void setBankaccountno(String bankaccountno) {
		this.bankaccountno = bankaccountno;
	}
	public String getConfirmbankaccountno() {
		return confirmbankaccountno;
	}
	public void setConfirmbankaccountno(String confirmbankaccountno) {
		this.confirmbankaccountno = confirmbankaccountno;
	}
	public String getIfsccode() {
		return ifsccode;
	}
	public void setIfsccode(String ifsccode) {
		this.ifsccode = ifsccode;
	}
	public String getConfirmifsccode() {
		return confirmifsccode;
	}
	public void setConfirmifsccode(String confirmifsccode) {
		this.confirmifsccode = confirmifsccode;
	}
	public String getBankaddress() {
		return bankaddress;
	}
	public void setBankaddress(String bankaddress) {
		this.bankaddress = bankaddress;
	}
	public String getFile() {
		return file;
	}
	public void setFile(String file) {
		this.file = file;
	}
	public String getFiledata() {
		return filedata;
	}
	public void setFiledata(String filedata) {
		this.filedata = filedata;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getFiletype() {
		return filetype;
	}
	public void setFiletype(String filetype) {
		this.filetype = filetype;
	}

	
	
}
