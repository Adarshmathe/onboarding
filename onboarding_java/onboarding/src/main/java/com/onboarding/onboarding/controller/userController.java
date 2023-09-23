package com.onboarding.onboarding.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.onboarding.onboarding.service.UserService;
import com.onboarding.onboarding.util.Newpassword;
import com.onboarding.onboarding.util.Role;
import com.onboarding.onboarding.util.User;
import com.onboarding.onboarding.util.UserRole;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class userController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptpasswordencoder;
	
	@PostMapping("/")
	public User createuser(@RequestBody User user) throws Throwable {
		
		//encode password with bcryptpasswordencoder
		user.setPassword(this.bcryptpasswordencoder.encode(user.getPassword()));
		
		user.setImage("default.png");
		user.setEnabled(true);
		
		Set<UserRole>roles= new HashSet<>();
		
		Role role = new Role();
		if(user.getRole().equals("USER")) {
		role.setRoleId(44L);
		role.setRoleName("USER");
		}else if(user.getRole().equals("ADMIN")) {
			role.setRoleId(45L);
			role.setRoleName("ADMIN");
		}
		
		
		UserRole userRole= new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		roles.add(userRole);
		return this.userService.createUser(user, roles);
	}
	
	@PutMapping("/")
	public User updateuser(@RequestBody User user) throws Throwable {
		

		Set<UserRole>roles= new HashSet<>();
		
		Role role = new Role();
		if(user.getRole().equals("USER")) {
		role.setRoleId(44L);
		role.setRoleName("USER");
		}else if(user.getRole().equals("ADMIN")) {
			role.setRoleId(45L);
			role.setRoleName("ADMIN");
		}
		
		
		UserRole userRole= new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		roles.add(userRole);
		
		return this.userService.updateuser(user, roles);
	}
	
//	@GetMapping("/{username}")
//	public User getuser(@PathVariable("username") String username) {
//		return this.userService.getUser(username);
//	}
	@GetMapping("/users/{id}")
	public User getuserbyid(@PathVariable("id") long id) {
		return this.userService.getuserbyid(id);
	}
	
	
	
	@GetMapping("/users")
	public List<User> getallusers(){
		return this.userService.getallusers();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteuser(@PathVariable("id") long id) {
		this.userService.deleteuser(id);
	}
	
	@PostMapping("/newpassword")
	public ResponseEntity<?> changepassword(@RequestBody Newpassword newpassword) throws Exception{
		User user = this.userService.getuserbyid(newpassword.getId());
		if(user==null) {
			throw new Exception("user is not present");
		}else {
		user.setPassword(this.bcryptpasswordencoder.encode(newpassword.getPassword()));
		this.userService.saveuser(user);
		return ResponseEntity.ok(user);
		}
	}
	@PostMapping("/changestatus")
	public ResponseEntity<?> changestatus(@RequestParam("status")Boolean status,@RequestParam("id")Long id) throws Exception{
		
		
		
		User user = this.userService.getuserbyid(id);
		if(user==null) {
			throw new Exception("user is not present");
		}else {
		user.setEnabled(status);
		this.userService.saveuser(user);
		return ResponseEntity.ok(user);
		}
	}
	
	@GetMapping("/getByDate")
	public ResponseEntity<?>  getByDate(@RequestParam String start,@RequestParam String end ) throws ParseException{
	
		 
			List<User> byDate = this.userService.getByDate(start,end);
			return new ResponseEntity<List<User>>(byDate, HttpStatus.OK);
	}

}
