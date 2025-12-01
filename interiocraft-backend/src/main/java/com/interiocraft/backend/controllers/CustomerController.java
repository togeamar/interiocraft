package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;
import com.interiocraft.backend.security.JwtUtils;
import com.interiocraft.backend.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST})
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {
	private final CustomerService customerService;
    
    
	@PostMapping("/signup")
	public ResponseEntity<?> registerCustomer(@RequestBody @Valid CustomerRegDto customerRegDto){
		System.out.println("in customer reg " + customerRegDto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(customerService.customerRegister(customerRegDto));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> cutomerSignIn(@RequestBody @Valid CustomerSignInDto signdto){
		
		
		
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(customerService.customerSignIn(signdto));
	}
}
