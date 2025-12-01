package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.ProjectDto;
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
