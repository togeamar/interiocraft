package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.ProjectDto;
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
import com.interiocraft.backend.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Admin")
@RequiredArgsConstructor
public class AdminController {
	private final AdminService adminService;
	
	private final DesignerService designerService;
	
	private final ProjectService projectService;
	
	
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
	
	@PostMapping("/projects")
	public ResponseEntity<?> createProject(@RequestBody @Valid ProjectDto projectDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(projectDto));
	}
	
	@GetMapping("/projects")
	public ResponseEntity<?> getAllProjects() {
		return ResponseEntity.ok(projectService.getAllProjects());
	}
	
	@GetMapping("/projects/{id}")
	public ResponseEntity<?> getProjectById(@PathVariable Long id) {
		return ResponseEntity.ok(projectService.getProjectById(id));
	}
	
	@PutMapping("/projects/{id}")
	public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody @Valid ProjectDto projectDto) {
		return ResponseEntity.ok(projectService.updateProject(id, projectDto));
	}
	
	@DeleteMapping("/projects/{id}")
	public ResponseEntity<?> deleteProject(@PathVariable Long id) {
		return ResponseEntity.ok(projectService.deleteProject(id));
	}
	
	@GetMapping("/projects/status/{status}")
	public ResponseEntity<?> getProjectsByStatus(@PathVariable String status) {
		return ResponseEntity.ok(projectService.getProjectsByStatus(status));
	}
	
	@GetMapping("/projects/customer/{customerId}")
	public ResponseEntity<?> getProjectsByCustomer(@PathVariable Long customerId) {
		return ResponseEntity.ok(projectService.getProjectsByCustomer(customerId));
	}
}
