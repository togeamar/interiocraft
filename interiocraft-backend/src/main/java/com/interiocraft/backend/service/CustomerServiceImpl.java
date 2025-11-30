package com.interiocraft.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.custom_exception.ApiException;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
	private final CustomerRepository customerRepo;
	private final ModelMapper modelMapper;
	
	
	@Override
	public ApiResponse customerRegister(CustomerRegDto regdto) {
		
		if(customerRepo.existsByEmail(regdto.getEmail()))
			throw new ApiException("email already exists");
		
		Customer customer=modelMapper.map(regdto, Customer.class);
		
		System.out.println("mapped entity "+customer);
		
		Customer persistentcustomer =customerRepo.save(customer);
		return new ApiResponse("New Customer Registered with ID="+persistentcustomer.getId(), "Success");
	}


	@Override
	public ApiResponse customerSignIn(CustomerSignInDto custindto) {
		
		Customer customer=customerRepo.findByEmailAndPassword(custindto.getEmail(), custindto.getPassword());
		
		return new ApiResponse(customer.toString(),"Success");
	}
	
	
}
