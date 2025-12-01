package com.interiocraft.backend.service;



import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.AdminSignInDto;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.LoginResponse;


public interface AdminService {
	ApiResponse adminRegister(AdminRegDto admindto);
	
	LoginResponse adminSignIn(AdminSignInDto adsigndto);
}
