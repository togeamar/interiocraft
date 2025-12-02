package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.interiocraft.backend.dto.ProjectDto;
import com.interiocraft.backend.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Project")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;
	
	@PostMapping(value = "/addProject/{email}", consumes = "multipart/form-data")
	public ResponseEntity<?> createProject(@PathVariable String email, 
			@org.springframework.web.bind.annotation.RequestPart("project") @Valid ProjectDto projectDto,
			@org.springframework.web.bind.annotation.RequestPart(value = "files", required = false) MultipartFile[] files) {
		if (files != null && files.length > 4) {
	        return ResponseEntity.badRequest().body("You can only upload a maximum of 4 images.");
	    }
		System.out.println("in add project controller");
		return ResponseEntity.status(HttpStatus.CREATED).body(projectService.createProject(email,projectDto,files != null ? files : new MultipartFile[0]));
	}
	
	@GetMapping("/projects")
	public ResponseEntity<?> getAllProjects() {
		return ResponseEntity.ok(projectService.getAllProjects());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getProjectById(@PathVariable Long id) {
		return ResponseEntity.ok(projectService.getProjectById(id));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody @Valid ProjectDto projectDto) {
		return ResponseEntity.ok(projectService.updateProject(id, projectDto));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProject(@PathVariable Long id) {
		return ResponseEntity.ok(projectService.deleteProject(id));
	}
	
	@GetMapping("/status/{status}")
	public ResponseEntity<?> getProjectsByStatus(@PathVariable String status) {
		return ResponseEntity.ok(projectService.getProjectsByStatus(status));
	}
	
	@GetMapping("/customer/{customerId}")
	public ResponseEntity<?> getProjectsByCustomer(@PathVariable Long customerId) {
		return ResponseEntity.ok(projectService.getProjectsByCustomer(customerId));
	}
}
