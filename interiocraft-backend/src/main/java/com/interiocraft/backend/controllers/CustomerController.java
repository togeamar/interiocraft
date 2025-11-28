package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.service.CustomerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

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
}
