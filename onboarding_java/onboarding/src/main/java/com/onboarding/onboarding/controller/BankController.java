package com.onboarding.onboarding.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

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
import com.onboarding.onboarding.service.BankDetailsService;
import com.onboarding.onboarding.util.Bank;
import com.onboarding.onboarding.util.BankDetails;
import com.onboarding.onboarding.util.Education;
import com.onboarding.onboarding.util.User;

@RestController
@RequestMapping("/bank")
@CrossOrigin("*")
public class BankController {

	@Autowired
	private BankDetailsService bankservice;
	
	@Value("${Project.educationpath}")
	private String path;
	
	@PostMapping("/")
	public ResponseEntity<?> saveDetails(@RequestBody BankDetails pe) throws IOException {
		
		List<Bank> extras = pe.getExtras();

		for (Bank e : extras) {
			
			if ((e.getFiledata() != "") && (e.getFiledata()!= null)) {
				
				byte[] byteArray = Base64.getDecoder().decode(e.getFiledata().split("base64,")[1]);

				String filepath = path + pe.getBuser().getId()+"//";

				String filename = "bank";

				if (e.getFiletype().equalsIgnoreCase("pdf")) {

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
					e.setFilename(storeFilename);
					e.setFiletype("pdf");

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
						System.out.println("file has been saved: " + filepath + filename);
					}
					e.setFilename(storeFilename);
					e.setFiletype("image");

				}
			}
		}
				
		
		BankDetails save = this.bankservice.save(pe);
		return ResponseEntity.ok(save);
	}
	
	@PutMapping("/")
	public ResponseEntity<?> updateDetails(@RequestBody BankDetails pe) throws IOException {
		
		List<Bank> extras = pe.getExtras();

		for (Bank e : extras) {

			if ((e.getFiledata() != "") && (e.getFiledata()!= null)) {

				byte[] byteArray = Base64.getDecoder().decode(e.getFiledata().split("base64,")[1]);

				String filepath = path + pe.getBuser().getId()+"//";

				String filename = "bank";

				if (e.getFiletype().equalsIgnoreCase("pdf")) {

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
					e.setFilename(storeFilename);
					e.setFiletype("pdf");

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
						System.out.println("file has been saved: " + filepath + filename);
					}
					e.setFilename(storeFilename);
					e.setFiletype("image");

				}
			}
		}
				
		BankDetails save = this.bankservice.update(pe);
		return ResponseEntity.ok(save);
	}
	
	@GetMapping("/user/{id}")
	public BankDetails getByUser(@PathVariable("id") Long id) {
		
		User user = new User();
		user.setId(id);
		BankDetails byUser = this.bankservice.getByUser(user);

		return byUser;
	}
}
