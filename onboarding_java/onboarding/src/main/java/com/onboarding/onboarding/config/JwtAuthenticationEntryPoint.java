package com.onboarding.onboarding.config;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Service;

@Service
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
//		response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "unauthorized");
//		response.sendError(500,"user already present");
		
		
		 final String expired = (String) request.getAttribute("expired");
		    System.out.println(expired);
		    if (expired!=null){
		    	response.sendError(HttpServletResponse.SC_UNAUTHORIZED,expired);
		    }else{
		    	response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Invalid Login details");
		    }
	}

}
