package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;
import com.interiocraft.backend.dto.LoginResponse;

public interface CustomerService {
	ApiResponse customerRegister(CustomerRegDto regdto);
	
	LoginResponse customerSignIn(CustomerSignInDto custindto);
}
