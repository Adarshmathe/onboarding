package com.onboarding.onboarding.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface DocumentUploadService {
	public String uploadImage(String id,String path , MultipartFile file) throws IOException;
	InputStream getResource(String path, String fileName) throws FileNotFoundException;
	
	List<String> getAllFiles(String path);
}
