package com.onboarding.onboarding.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onboarding.onboarding.service.PersonalDetailsService;
import com.onboarding.onboarding.util.PersonalDetails;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/personal")
@CrossOrigin("*")
public class PersonalDetailsController {
	
	@Autowired
	private PersonalDetailsService ps;
	
	@Value("${Project.educationpath}")
	private String path;

	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody PersonalDetails pe) throws IOException {
		
		if (pe.getPassportDetails().getPassportfiledata() != "" && (pe.getPassportDetails().getPassportfiledata()!= null)) {
	
			byte[] byteArray = Base64.getDecoder().decode(pe.getPassportDetails().getPassportfiledata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "passport";

			if (pe.getPassportDetails().getPassportfiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.getPassportDetails().setPassportfilename(storeFilename);
				pe.getPassportDetails().setPassportfiletype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				
				pe.getPassportDetails().setPassportfilename(storeFilename);
				pe.getPassportDetails().setPassportfiletype("image");
	

			}
		}
		
		if (pe.getPanAndaadhar().getPancardfiledata() != "" && (pe.getPanAndaadhar().getPancardfiledata()!= null)) {

			byte[] byteArray = Base64.getDecoder().decode(pe.getPanAndaadhar().getPancardfiledata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "pancard";

			if (pe.getPanAndaadhar().getPancardfiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.getPanAndaadhar().setPancardfilename(storeFilename);
				pe.getPanAndaadhar().setPancardfiletype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				System.out.println(storeFilename);
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				pe.getPanAndaadhar().setPancardfilename(storeFilename);
				pe.getPanAndaadhar().setPancardfiletype("image");

			}
		}
		
		
		if (pe.getPanAndaadhar().getAadharcardfiledata() != "" && (pe.getPanAndaadhar().getAadharcardfiledata()!= null)) {

			byte[] byteArray = Base64.getDecoder().decode(pe.getPanAndaadhar().getAadharcardfiledata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "aadhar";

			if (pe.getPanAndaadhar().getAadharcardfiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.getPanAndaadhar().setAadharcardfilename(storeFilename);
				pe.getPanAndaadhar().setAadharcardfiletype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				pe.getPanAndaadhar().setAadharcardfilename(storeFilename);
				pe.getPanAndaadhar().setAadharcardfiletype("image");
				
			}
		}
		if (pe.getImagedata() != "" && (pe.getImagedata()!= null)) {
			
			byte[] byteArray = Base64.getDecoder().decode(pe.getImagedata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "userimage";

			if (pe.getImagedatatype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.setImagedataname(storeFilename);
				pe.setImagedatatype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				
				pe.setImagedataname(storeFilename);
				pe.setImagedatatype("pdf");
	

			}
		}
		if (pe.getSignaturedata() != "" && (pe.getSignaturedata()!= null)) {
			
			byte[] byteArray = Base64.getDecoder().decode(pe.getSignaturedata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "usersignature";

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				} 

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				
				pe.setSignaturename(storeFilename);
				pe.setSignaturetype("image");
	
		}		
		PersonalDetails save = this.ps.save(pe);
		return ResponseEntity.ok(save);
	}
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody PersonalDetails pe) throws IOException {
		
		if (pe.getPassportDetails().getPassportfiledata() !="" && (pe.getPassportDetails().getPassportfiledata()!= null)) {

			byte[] byteArray = Base64.getDecoder().decode(pe.getPassportDetails().getPassportfiledata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "passport";

			if (pe.getPassportDetails().getPassportfiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.getPassportDetails().setPassportfilename(storeFilename);
				pe.getPassportDetails().setPassportfiletype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				
				pe.getPassportDetails().setPassportfilename(storeFilename);
				pe.getPassportDetails().setPassportfiletype("image");
	

			}
		}
		if (pe.getPanAndaadhar().getPancardfiledata() != "" && (pe.getPanAndaadhar().getPancardfiledata()!= null)) {

			byte[] byteArray = Base64.getDecoder().decode(pe.getPanAndaadhar().getPancardfiledata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "pancard";

			if (pe.getPanAndaadhar().getPancardfiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.getPanAndaadhar().setPancardfilename(storeFilename);
				pe.getPanAndaadhar().setPancardfiletype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				pe.getPanAndaadhar().setPancardfilename(storeFilename);
				pe.getPanAndaadhar().setPancardfiletype("image");

			}
		}
		
		if (pe.getPanAndaadhar().getAadharcardfiledata() != "" && (pe.getPanAndaadhar().getAadharcardfiledata()!= null)) {

			byte[] byteArray = Base64.getDecoder().decode(pe.getPanAndaadhar().getAadharcardfiledata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "aadhar";

			if (pe.getPanAndaadhar().getAadharcardfiletype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.getPanAndaadhar().setAadharcardfilename(storeFilename);
				pe.getPanAndaadhar().setAadharcardfiletype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				pe.getPanAndaadhar().setAadharcardfilename(storeFilename);
				pe.getPanAndaadhar().setAadharcardfiletype("image");
				
			}
		}
if (pe.getImagedata() != "" && (pe.getImagedata()!= null)) {
			
			byte[] byteArray = Base64.getDecoder().decode(pe.getImagedata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "userimage";

			if (pe.getImagedatatype().equalsIgnoreCase("pdf")) {

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}
				String storeFilename = filename + ".pdf";
				
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String imagename = filename + ".jpg";
				File storeFile2 = new File(filepath + imagename);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				BufferedOutputStream bf = new BufferedOutputStream(new FileOutputStream(storeFile));
				bf.write(byteArray);
				try {
					bf.close();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				pe.setImagedataname(storeFilename);
				pe.setImagedatatype("pdf");


			} else {
				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				}

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				String pdfname = filename + ".pdf";
				File storeFile2 = new File(filepath + pdfname);
				if (storeFile2.exists()) {
					storeFile2.delete();
				}
				
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				
				pe.setImagedataname(storeFilename);
				pe.setImagedatatype("pdf");
	

			}
		}
		if (pe.getSignaturedata() != "" && (pe.getSignaturedata()!= null)) {
			
			byte[] byteArray = Base64.getDecoder().decode(pe.getSignaturedata().split("base64,")[1]);

			String filepath = path + pe.getUser().getId()+"//";

			String filename = "usersignature";

				File dir = new File(filepath);
				if (!dir.exists()) {
					dir.mkdirs();
				} 

				String storeFilename = filename + ".jpg";
				File storeFile = new File(filepath + storeFilename);
				if (storeFile.exists()) {
					storeFile.delete();
				}
				
				Path path = Paths.get(filepath + storeFilename);
				if (byteArray != null) {
					Files.write(path, byteArray);
				}
				
				pe.setSignaturename(storeFilename);
				pe.setSignaturetype("image");
		}
		
				
		PersonalDetails save = this.ps.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public PersonalDetails getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		
		return this.ps.getByUser(user);
	}
}
