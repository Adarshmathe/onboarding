package com.onboarding.onboarding.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.UserRoleRepo;
import com.onboarding.onboarding.service.UserService;
import com.onboarding.onboarding.util.CustomException;
import com.onboarding.onboarding.util.User;
import com.onboarding.onboarding.util.UserRole;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private com.onboarding.onboarding.repo.userRepository userRepository;
	
	@Autowired
	private com.onboarding.onboarding.repo.RoleRepository roleRepository;
	
	@Autowired
	private UserRoleRepo userrolerepo;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Throwable {
		// TODO Auto-generated method stub
		User local=this.userRepository.getUserByEmail(user.getEmail());
//		user local1 = this.userRepository.getUserByEmail(user.getEmail());
		
			if(local!=null) {
				System.out.println("user is already there...");
				throw new CustomException("601","Email ID already exist");
			}else {
				for(UserRole ur: userRoles) {
					roleRepository.save(ur.getRole());
				}
				user.getUserRoles().addAll(userRoles);
				local=userRepository.save(user);
				return local;
			}
	}
	
	@Override
	public User updateuser(User user,Set<UserRole> userRoles) throws Exception {
		
		User local=this.userRepository.getUserByEmail(user.getEmail());
		
		if(local==null) {
			UserRole findByUser = this.userrolerepo.findByUser(user);
			for(UserRole ur: userRoles) {
				findByUser.setRole(ur.getRole());
				this.userrolerepo.save(findByUser);
			}
			User save = userRepository.save(user);
			return save;
		}else if(user.getId()==local.getId()) {
			UserRole findByUser = this.userrolerepo.findByUser(user);
			for(UserRole ur: userRoles) {
				findByUser.setRole(ur.getRole());
				this.userrolerepo.save(findByUser);
			}
			User save = userRepository.save(user);
			return save;
		}else {
			System.out.println("user is already there...");
			throw new Exception("user already present");
		}
		
	}
	
	

//	@Override
//	public User getUser(String username) {
//		// TODO Auto-generated method stub
//		return this.userRepository.findByUsername(username);
//	}



	@Override
	public List<User> getallusers() {
		// TODO Auto-generated method stub
		return this.userRepository.findAll();
	}

	@Override
	public void deleteuser(long id) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(id);
		
	}

	@Override
	public User getuserbyid(long id) {
		// TODO Auto-generated method stub
		return this.userRepository.findById(id).get();
	}

	@Override
	public User saveuser(User user) {
		// TODO Auto-generated method stub
		return this.userRepository.save(user);
	}

	@Override
	public List<User> getByDate(String start, String end) throws ParseException {
		// TODO Auto-generated method stub
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date start1 = simpleDateFormat.parse(start);
		Date end1 = simpleDateFormat.parse(end);
		
	
		List<User> findByEntryDateBetween = this.userRepository.findByCreatedOnBetween(start1, end1);
		
		return findByEntryDateBetween;
	}







	

}
