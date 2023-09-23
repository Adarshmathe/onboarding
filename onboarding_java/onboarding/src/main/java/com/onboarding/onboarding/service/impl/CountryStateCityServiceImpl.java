package com.onboarding.onboarding.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onboarding.onboarding.repo.CityRepo;
import com.onboarding.onboarding.repo.CountryRepo;
import com.onboarding.onboarding.repo.DistrictRepo;
import com.onboarding.onboarding.repo.StateRepo;
import com.onboarding.onboarding.service.CountryStateCityService;
import com.onboarding.onboarding.util.Cities;
import com.onboarding.onboarding.util.Countries;
import com.onboarding.onboarding.util.Districts;
import com.onboarding.onboarding.util.States;

@Service
public class CountryStateCityServiceImpl implements CountryStateCityService {
	
	@Autowired
	public CountryRepo CountryRepo;
	@Autowired
	public StateRepo StateRepo;
	@Autowired
	public CityRepo CityRepo;
	@Autowired
	public DistrictRepo DistrictRepo;
	
	@Override
	public List<Countries> getCountriesList() {
		return this.CountryRepo.findAll();
	}

	@Override
	public List<States> getStatesList(Countries c) {
		return this.StateRepo.findByCountry(c);
	}

	@Override
	public List<Cities> getCitiesList(States s) {
		// TODO Auto-generated method stub
		return this.CityRepo.findByState(s);
	}

	@Override
	public List<Districts> getDistrictslist(States s) {
		// TODO Auto-generated method stub
		return this.DistrictRepo.findByDstate(s);
	}
	
	

}
