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
import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.AdminSignInDto;
import com.interiocraft.backend.dto.ApiResponse;

import com.interiocraft.backend.dto.LoginResponse;
import com.interiocraft.backend.entities.Admin;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.repository.AdminRepository;
import com.interiocraft.backend.security.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminRepository adminRepo;
	
	private final ModelMapper modelMapper;
	
	private final PasswordEncoder passwordEncoder; 
	
private final AuthenticationManager authenticationManager;
	
	private final JwtUtils jwtutil;
	
	
	@Override
	public ApiResponse adminRegister(AdminRegDto admindto) {
		
		if(adminRepo.existsByEmail(admindto.getEmail()))
			throw new ApiException("email is not valid");
			
		Admin entity =modelMapper.map(admindto, Admin.class);
		
		String encodedPassword=passwordEncoder.encode(entity.getPassword());
		
		entity.setPassword(encodedPassword);
		
		Admin persistentEntity=adminRepo.save(entity);
		return new ApiResponse("New Admin Has beedn added by the Id"+persistentEntity.getId(),"Success");
	}


	@Override
	public LoginResponse adminSignIn(AdminSignInDto adsigndto) {
		UsernamePasswordAuthenticationToken authToken = 
	            new UsernamePasswordAuthenticationToken(
	                adsigndto.getEmail(),  
	                adsigndto.getPassword()  
	            );
		
		String firstName;
		String email;
		String status;
		Authentication authenticatedAdmin = authenticationManager.authenticate(authToken);
		Object principal=authenticatedAdmin.getPrincipal();
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
		
		String jwt=jwtutil.generateToken((UserDetails) principal);
		return new LoginResponse("admin logged in successfully",status,jwt,firstName,email);
	}

}
