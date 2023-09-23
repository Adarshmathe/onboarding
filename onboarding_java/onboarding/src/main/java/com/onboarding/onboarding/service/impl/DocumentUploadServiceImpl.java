package com.onboarding.onboarding.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.onboarding.onboarding.service.DocumentUploadService;
import com.onboarding.onboarding.util.User;

@Service
public class DocumentUploadServiceImpl implements DocumentUploadService {
	
	@Autowired
	private com.onboarding.onboarding.repo.userRepository userRepository;

	@Override
	public String uploadImage(String id,String path, MultipartFile file) throws IOException {
		//ex:abc.png
		
				String name = file.getOriginalFilename();
				
				String RandomID = UUID.randomUUID().toString();
				String r1 = RandomID.concat(id);
				String filename1 = r1.concat(name.substring(name.lastIndexOf(".")));
//				String filename1 = id.concat(name.substring(name.lastIndexOf(".")));
				
			
				//update image-name in db
				long l=Long.parseLong(id); 
				User user = this.userRepository.findById(l).get();
				user.setImage(filename1);
				this.userRepository.save(user);
				
				//fillpath
				String filepath = path + File.separator +filename1;
				
				//create folder if not created
				
				File f = new File(path);
				if(!f.exists()) {
					f.mkdir();
				}
				
				File f1 = new File(filepath);
				if(f1.exists()) {
					
					System.out.println(filepath);
					boolean delete = f1.delete();
					System.out.println(delete);
					
				}
				

				//filecopy
				Files.copy(file.getInputStream(), Paths.get(filepath));
				
				return filename1;
	}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		String fullPath = path+File.separator+fileName;
//		System.out.println(fullPath);
		InputStream is = new FileInputStream(fullPath);
		
		return is;
	}

	@Override
	public List<String> getAllFiles(String path) {
		
		List<String> results = new ArrayList<String>();

		File[] files = new File(path).listFiles();

		for (File file : files) {
		    if (file.isFile()) {
		        results.add(file.getAbsolutePath());
		    }
		}
		
//		results.forEach(a->System.out.println(a));
		return results;
	}
	
	

}
