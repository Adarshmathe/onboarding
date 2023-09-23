package com.onboarding.onboarding.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onboarding.onboarding.util.Countries;

public interface CountryRepo extends JpaRepository<Countries, Long> {

}
