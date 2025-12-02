package com.interiocraft.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.custom_exception.ApiException;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.LoginResponse;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;
import com.interiocraft.backend.entities.Admin;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.repository.CustomerRepository;
import com.interiocraft.backend.security.JwtUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
	private final CustomerRepository customerRepo;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder; 
	private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
	
	
	@Override
	public ApiResponse customerRegister(CustomerRegDto regdto) {
		
		if(customerRepo.existsByEmail(regdto.getEmail()))
			throw new ApiException("email already exists");
		
		Customer customer=modelMapper.map(regdto, Customer.class);
		
		String EnodedPassword=passwordEncoder.encode(regdto.getPassword());
		customer.setPassword(EnodedPassword);
		System.out.println("mapped entity "+customer);
		
		Customer persistentcustomer =customerRepo.save(customer);
		return new ApiResponse("New Customer Registered with ID="+persistentcustomer.getId(), "Success");
	}


	@Override
	public LoginResponse customerSignIn(CustomerSignInDto signdto) {
		
		
		log.info(signdto.getEmail()+" "+signdto.getPassword());
		UsernamePasswordAuthenticationToken authToken = 
	            new UsernamePasswordAuthenticationToken(
	                signdto.getEmail(),   
	                signdto.getPassword()  
	            );
		
		String firstName;
		String email;
		String status;
		Authentication authenticatedUser = authenticationManager.authenticate(authToken);
		Object principal=authenticatedUser.getPrincipal();
		System.out.println(principal);
		if (principal instanceof Customer) {
		    Customer c = (Customer) principal;
		    firstName = c.getFirstName();
		    email = c.getEmail();
		    status = "customer";
		} 
		else if (principal instanceof Admin) {
		    Admin a = (Admin) principal;
		    firstName = a.getFirstName();
		    email = a.getEmail();
		    status = "admin";
		} 
		else {
		    throw new IllegalStateException("Unknown user type: " + principal.getClass());
		}
		
		String jwt=jwtUtils.generateToken((UserDetails) principal);
		return new LoginResponse("admin logged in successfully",status,jwt,firstName,email);
		
		
	}
	
	
}
