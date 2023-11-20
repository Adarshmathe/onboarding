package com.onboarding.onboarding.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;

import com.onboarding.onboarding.service.DocumentUploadService;

import jakarta.servlet.http.HttpServletResponse;
@RestController
@RequestMapping("/image")
@CrossOrigin("*")
public class DocumentUploadController {
	
	@Autowired
	private DocumentUploadService userService;
	
	@Value("${project.image}")
	private String path;
	
	@Value("${Project.pdf}")
	private String pdfpath;
	
	@Value("${Project.educationpath}")
	private String documentpath;
	
	@PostMapping("/")
	public String ImageUploader(@RequestParam("image") MultipartFile image, @RequestParam("userId") String id) throws Throwable {
				
		//upload image
		
		String filename = this.userService.uploadImage(id,path, image);
		
		return filename;

	}
	
	
	
	@GetMapping(value="images/{imageName}",produces=MediaType.IMAGE_JPEG_VALUE)
	public void downloadimage(@PathVariable("imageName") String imageName,
			HttpServletResponse response) throws IOException {
		
		InputStream resource = this.userService.getResource(path, imageName);
		
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
	
	@GetMapping(value="/pdf/{pdfName}",produces=MediaType.APPLICATION_PDF_VALUE)
	public void downloadpdf(@PathVariable("pdfName") String pdfName,
			HttpServletResponse response) throws IOException {
		
		InputStream resource = this.userService.getResource(pdfpath, pdfName);
		
		response.setContentType(MediaType.APPLICATION_PDF_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
	
	//fetch all documents user wise
	@GetMapping(value="download/{id}/{name}",produces=MediaType.IMAGE_JPEG_VALUE)
	public void downloaduserdata(@PathVariable("name") String name,@PathVariable("id") String id,
			HttpServletResponse response) throws IOException {
		String fullpath = documentpath + id + File.separator;
		
		InputStream resource = this.userService.getResource(fullpath, name);
		
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
	
	//download all document in zip format

	@GetMapping(value="downloads/{id}")
	public void downloadfiles(@PathVariable("id") String id,HttpServletResponse response)
	{
		String path = documentpath + id + File.separator;
		List<String> fileNames = this.userService.getAllFiles(path);
		
		 response.setContentType("application/octet-stream");
	        response.setHeader("Content-Disposition", "attachment;filename=download.zip");
	        response.setStatus(HttpServletResponse.SC_OK);

//	        List<String> fileNames = service.getFileName();

	        System.out.println("############# file size ###########" + fileNames.size());

	        try (ZipOutputStream zippedOut = new ZipOutputStream(response.getOutputStream())) {
	            for (String file : fileNames) {
	                FileSystemResource resource = new FileSystemResource(file);

	                ZipEntry e = new ZipEntry(resource.getFilename());
	                // Configure the zip entry, the properties of the file
	                e.setSize(resource.contentLength());
	                e.setTime(System.currentTimeMillis());
	                // etc.
//	                System.out.println(e);
	                zippedOut.putNextEntry(e);
	                // And the content of the resource:
	                StreamUtils.copy(resource.getInputStream(), zippedOut);
	                zippedOut.closeEntry();
	            }
	            zippedOut.finish();
	        } catch (Exception e) {
	            // Exception handling goes here
	        }
	    }
	
}
