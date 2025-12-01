package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.ProjectDto;
import com.interiocraft.backend.dto.ProjectResponseDto;

import java.util.List;

public interface ProjectService {
    
    ApiResponse createProject(ProjectDto projectDto);
    
    ProjectResponseDto getProjectById(Long id);
    
    List<ProjectResponseDto> getAllProjects();
    
    ApiResponse updateProject(Long id, ProjectDto projectDto);
    
    ApiResponse deleteProject(Long id);
    
    List<ProjectResponseDto> getProjectsByStatus(String status);
    
    List<ProjectResponseDto> getProjectsByCustomer(Long customerId);
}