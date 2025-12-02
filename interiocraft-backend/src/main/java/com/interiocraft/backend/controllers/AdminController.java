package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.AdminRegDto;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.interiocraft.backend.dto.AdminSignInDto;

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
	
	@PostMapping("/signin")
	public ResponseEntity<?> adminSignIn(@RequestBody @Valid AdminSignInDto adsigndto) {
		System.out.println("in customer reg " + adsigndto);
		
		if(adminService.adminSignIn(adsigndto)!=null) {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(adminService.adminSignIn(adsigndto));
		}
		
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("admin login failed");
		
		
	}
	
	@PostMapping("/AddDesigner")
	public ResponseEntity<?> addDesigner(@RequestBody @Valid AddDesignerDto desdto){
		System.out.println("in Add Designer " + desdto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(designerService.addDesigner(desdto));
	}
	
	@GetMapping("/designers")
	public ResponseEntity<?> getAllDesigners() {
		return ResponseEntity.ok(designerService.getAllDesigners());
	}
	
	@org.springframework.web.bind.annotation.PutMapping("/designer/{id}")
	public ResponseEntity<?> updateDesigner(@org.springframework.web.bind.annotation.PathVariable Long id, @RequestBody @Valid AddDesignerDto desdto) {
		return ResponseEntity.ok(designerService.updateDesigner(id, desdto));
	}
	
	@org.springframework.web.bind.annotation.DeleteMapping("/designer/{id}")
	public ResponseEntity<?> deleteDesigner(@org.springframework.web.bind.annotation.PathVariable Long id) {
		return ResponseEntity.ok(designerService.deleteDesigner(id));
	}
	
}
