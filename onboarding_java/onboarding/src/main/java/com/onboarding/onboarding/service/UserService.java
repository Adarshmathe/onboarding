package com.onboarding.onboarding.service;

import java.text.ParseException;
import java.util.List;
import java.util.Set;
import com.onboarding.onboarding.util.User;
import com.onboarding.onboarding.util.UserRole;

public interface UserService {
	
	public User createUser(User user, Set<UserRole> userRoles) throws Throwable;
//	public User getUser(String username);
//	public user getUserByEmail(String email);
	public User saveuser(User user);
	public User updateuser(User user,Set<UserRole> userRoles) throws Throwable;
	public List<User> getallusers();
	public void deleteuser(long id);
	public User getuserbyid(long id);
	public List<User> getByDate(String start , String end) throws ParseException;

}

