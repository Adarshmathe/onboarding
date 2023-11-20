package com.onboarding.onboarding.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import com.onboarding.onboarding.service.impl.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class MySecurityConfig  {
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
//	@Bean
//	public AuthenticationManager authenticationManagerBean() throws Exception {
//		return super.authenticationManagerBean();
//	}
	
	 @Bean
	    AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
	 	   
	 	   return auth.getAuthenticationManager();
	    }
	
	@Bean
	 BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
//	@SuppressWarnings("deprecation")
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return NoOpPasswordEncoder.getInstance();
//	}

//	@Override
//	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		
//		auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
//		
//	}
	
	 @Bean
		DaoAuthenticationProvider DaoAuthenticationProvider() {
			
			DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
			
			auth.setUserDetailsService(userDetailsServiceImpl);
			auth.setPasswordEncoder(passwordEncoder());
			
			return auth;
			
		}

	@Bean
	 SecurityFilterChain SecurityFilterChainbean(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(requests -> {
                		
                		requests.requestMatchers( AntPathRequestMatcher.antMatcher("/generate-token")).permitAll();
                		requests.requestMatchers( AntPathRequestMatcher.antMatcher("/user/")).permitAll();
                		requests.requestMatchers( AntPathRequestMatcher.antMatcher("/image/**")).permitAll();

                        requests.anyRequest().authenticated();
                		
//                        .requestMatchers("/generate-token", "/user/").permitAll()
//                        .requestMatchers("/image/**").permitAll()
//                        .requestMatchers(HttpMethod.OPTIONS).permitAll()
//                        .anyRequest().authenticated()
					} )
                .sessionManagement(management -> management
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(handling -> handling.authenticationEntryPoint(unauthorizedHandler));
		 				
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		 return http.build();
	}
	
	  @Bean
	    CorsConfigurationSource corsConfigurationSource() {
	       CorsConfiguration configuration = new CorsConfiguration();
	       configuration.setAllowedOrigins(Arrays.asList("*"));
	       configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	       configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type", "x-auth-token"));
	       configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
	       UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	       source.registerCorsConfiguration("/**", configuration);
	       return source;
	   }
	
}
