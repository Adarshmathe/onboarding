package com.onboarding.onboarding.service.impl;

import java.io.File;
import java.io.IOException;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.onboarding.onboarding.util.EmailEntity;

@Service
public class EmailService {
	
    @Autowired 
    private JavaMailSender javaMailSender;
    
    @Value("${spring.mail.username}") private String sender;
	
	public String sendEmail(String to, String subject, String body,MultipartFile file) {
		
		 MimeMessage mimeMessage
         = javaMailSender.createMimeMessage();
     MimeMessageHelper mimeMessageHelper;

     try {

         // Setting multipart as true for attachments to
         // be send
         mimeMessageHelper
             = new MimeMessageHelper(mimeMessage, true);
         mimeMessageHelper.setFrom(sender);
         mimeMessageHelper.setTo(to);
         mimeMessageHelper.setText(body);
         mimeMessageHelper.setSubject(subject);

         // Adding the attachment
//         FileSystemResource file
//             = new FileSystemResource(
//                 new File(details.getAttachment()));
         if(file!=null) {
             mimeMessageHelper.addAttachment(file.getOriginalFilename(), file );

         }


         // Sending the mail
         javaMailSender.send(mimeMessage);
         return "Mail sent Successfully";
     }

     // Catch block to handle MessagingException
     catch (MessagingException e) {

         // Display message when exception occurred
         return "Error while sending mail!!!";
     }
 


	}
	
	
public EmailEntity getJson(String user) {
		
		
		EmailEntity emailJson = new EmailEntity();
		try {
			ObjectMapper obj = new ObjectMapper();
			emailJson =obj.readValue(user,EmailEntity.class );
		}catch(IOException iox) {
			System.out.println("part" +iox.toString());
		
		}
		return emailJson;
	}
}
