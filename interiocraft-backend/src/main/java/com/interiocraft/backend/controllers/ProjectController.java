package com.interiocraft.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interiocraft.backend.dto.ProjectDto;
import com.interiocraft.backend.service.ProjectService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Project")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;
	
	private final ObjectMapper objectMapper; // 1. Inject ObjectMapper
	
	@PostMapping(value = "/addProject/{email}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createProject(@PathVariable String email,@RequestPart("projectDto") String projectDtoJson,
			@RequestPart("files") MultipartFile[] files) {
		
		if (files.length > 4) {
	        return ResponseEntity.badRequest().body("You can only upload a maximum of 4 images.");
	    }
		try {
            
            ProjectDto projectDto = objectMapper.readValue(projectDtoJson, ProjectDto.class);
            
            System.out.println("in add project controller");
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.createProject(email, projectDto, files));

        } catch (Exception e) {
            // Handle invalid JSON format
            return ResponseEntity.badRequest().body("Invalid JSON in projectDto: " + e.getMessage());
        }

		
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
