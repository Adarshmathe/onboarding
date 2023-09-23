package com.onboarding.onboarding.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onboarding.onboarding.service.CountryStateCityService;
import com.onboarding.onboarding.util.Cities;
import com.onboarding.onboarding.util.Countries;
import com.onboarding.onboarding.util.Districts;
import com.onboarding.onboarding.util.States;

@RestController
@RequestMapping("/find")
@CrossOrigin("*")
public class CountryStateCityController {
	
	@Autowired
	private CountryStateCityService cs;
	
	
	@GetMapping("/countries")
	public ResponseEntity<List<Countries>> getcountriesList(){
		
		List<Countries> countriesList = this.cs.getCountriesList();
		
		return new ResponseEntity<>(countriesList,HttpStatus.OK);
		
	}
	@GetMapping("/state/{id}")
	public ResponseEntity<List<States>> getStateList(@PathVariable("id") long id){
		
		Countries countries = new Countries();
		countries.setId(id);
		
		List<States> Statelist = this.cs.getStatesList(countries);
		
		return new ResponseEntity<>(Statelist,HttpStatus.OK);
		
	}
	@GetMapping("/city/{id}")
	public ResponseEntity<List<Cities>> getCityList(@PathVariable("id") long id){
		
		States states = new States();
		states.setId(id);
		
		List<Cities> CityList = this.cs.getCitiesList(states);
		
		return new ResponseEntity<>(CityList,HttpStatus.OK);
		
	}
	@GetMapping("/district/{id}")
	public ResponseEntity<List<Districts>> getDistrictList(@PathVariable("id") long id){
		States states = new States();
		states.setId(id);
		
		List<Districts> districtsList = this.cs.getDistrictslist(states);
		
		return new ResponseEntity<>(districtsList,HttpStatus.OK);
		
	}
	

}
