package com.onboarding.onboarding.service;

import java.util.List;

import com.onboarding.onboarding.util.Cities;
import com.onboarding.onboarding.util.Countries;
import com.onboarding.onboarding.util.Districts;
import com.onboarding.onboarding.util.States;

public interface CountryStateCityService {

	List<Countries> getCountriesList();
	List<States> getStatesList(Countries c);
	List<Cities> getCitiesList(States s);
	List<Districts> getDistrictslist(States s);
}
