package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.AdminSignInDto;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.security.JwtUtils;
import com.interiocraft.backend.service.AdminService;
import com.interiocraft.backend.service.DesignerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Admin")
@RequiredArgsConstructor
public class AdminController {
	private final AdminService adminService;
	
	private final DesignerService designerService;
	
	private final AuthenticationManager authenticationManager;
	
	private final JwtUtils jwtutil;
	
	@PostMapping("/AddAdmin")
	public ResponseEntity<?> addAdmin(@RequestBody @Valid AdminRegDto adregdto) {
		System.out.println("in customer reg " + adregdto);

		
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.adminRegister(adregdto));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> adminSignIn(@RequestBody @Valid AdminSignInDto adsigndto) {
		System.out.println("in customer reg " + adsigndto);
		
		UsernamePasswordAuthenticationToken authToken = 
	            new UsernamePasswordAuthenticationToken(
	                adsigndto.getEmail(),    // Username (email)
	                adsigndto.getPassword()  // Password (plain text)
	            );
		Authentication authenticatedAdmin = authenticationManager.authenticate(authToken);
		
		UserDetails userdetails=(UserDetails) authenticatedAdmin.getPrincipal();
		
		String jwt=jwtutil.generateToken(userdetails);
		
		return ResponseEntity.ok(
	            new ApiResponse(jwt, "Admin Login successful")
	        );
	}
	
	@PostMapping("/AddDesigner")
	public ResponseEntity<?> addDesigner(@RequestBody @Valid AddDesignerDto desdto){
		System.out.println("in Add Designer " + desdto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(designerService.addDesigner(desdto));
	}
}
