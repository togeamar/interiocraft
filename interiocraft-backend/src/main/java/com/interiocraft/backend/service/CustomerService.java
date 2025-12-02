package com.interiocraft.backend.service;

import java.util.List;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;
import com.interiocraft.backend.dto.LoginResponse;
import com.interiocraft.backend.entities.Customer;

public interface CustomerService {
	ApiResponse customerRegister(CustomerRegDto regdto);
	
	LoginResponse customerSignIn(CustomerSignInDto custindto);
	
	List<Customer> getAllCustomers();
	
	ApiResponse updateCustomer(Long id, com.interiocraft.backend.dto.CustomerUpdateDto dto);
	
	ApiResponse deleteCustomer(Long id);
}
