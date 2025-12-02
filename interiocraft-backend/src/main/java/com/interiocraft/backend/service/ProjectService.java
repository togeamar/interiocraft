package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.ProjectDto;
import com.interiocraft.backend.dto.ProjectResponseDto;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ProjectService {
    
    ApiResponse createProject(String customerEmail,ProjectDto projectDto,MultipartFile[] files);
    
    ProjectResponseDto getProjectById(Long id);
    
    List<ProjectResponseDto> getAllProjects();
    
    ApiResponse updateProject(Long id, ProjectDto projectDto);
    
    ApiResponse deleteProject(Long id);
    
    List<ProjectResponseDto> getProjectsByStatus(String status);
    
    List<ProjectResponseDto> getProjectsByCustomer(Long customerId);
}