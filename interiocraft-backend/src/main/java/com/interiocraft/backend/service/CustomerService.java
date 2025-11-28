package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerRegDto;

public interface CustomerService {
	ApiResponse customerRegister(CustomerRegDto regdto);
}
