package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerLoginResponseDto;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;

public interface CustomerService {
	
    ApiResponse customerRegister(CustomerRegDto regdto);
	
    CustomerLoginResponseDto customerSignIn(CustomerSignInDto custindto);
}

