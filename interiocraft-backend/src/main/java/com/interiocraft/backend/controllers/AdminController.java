package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.AdminRegDto;
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
	
	@PostMapping("/AddAdmin")
	public ResponseEntity<?> addAdmin(@RequestBody @Valid AdminRegDto adregdto) {
		System.out.println("in customer reg " + adregdto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.adminRegister(adregdto));
	}
	
	@PostMapping("/AddDesigner")
	public ResponseEntity<?> addDesigner(@RequestBody @Valid AddDesignerDto desdto){
		System.out.println("in Add Designer " + desdto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(designerService.addDesigner(desdto));
	}
}
