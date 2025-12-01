package com.interiocraft.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.custom_exception.ResourceNotFoundException;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.ProjectDto;
import com.interiocraft.backend.dto.ProjectResponseDto;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.entities.Designer;
import com.interiocraft.backend.entities.Project;
import com.interiocraft.backend.entities.ProjectStatus;
import com.interiocraft.backend.repository.CustomerRepository;
import com.interiocraft.backend.repository.DesignerRepository;
import com.interiocraft.backend.repository.ProjectRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectRepository;
    private final CustomerRepository customerRepository;
    private final DesignerRepository designerRepository;
    
    @Override
    public ApiResponse createProject(ProjectDto projectDto) {
        Customer customer = customerRepository.findById(projectDto.getCustomerId())
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        
        Project project = new Project();
        project.setProjectName(projectDto.getProjectName());
        project.setCustomer(customer);
        project.setLocation(projectDto.getLocation());
        project.setBudget(projectDto.getBudget());
        project.setProjectStatus(ProjectStatus.REQUESTED);
        project.setStatusMessage(projectDto.getStatusMessage());
        project.setFeedback(projectDto.getFeedback());
        project.setProjectType(projectDto.getProjectType());
        project.setAreaSqft(projectDto.getAreaSqft());
        project.setStartDate(projectDto.getStartDate());
        project.setCompletionDate(projectDto.getCompletionDate());
        project.setAddress(projectDto.getAddress());
        project.setCity(projectDto.getCity());
        project.setState(projectDto.getState());
        
        if (projectDto.getDesignerId() != null) {
            Designer designer = designerRepository.findById(projectDto.getDesignerId())
                .orElseThrow(() -> new ResourceNotFoundException("Designer not found"));
            project.setDesigner(designer);
        }
        
        projectRepository.save(project);
        return new ApiResponse("Project created successfully", "Success");
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProjectResponseDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return mapToResponseDto(project);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> getAllProjects() {
        return projectRepository.findAll().stream()
            .map(this::mapToResponseDto)
            .collect(Collectors.toList());
    }
    
    @Override
    public ApiResponse updateProject(Long id, ProjectDto projectDto) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
        project.setProjectName(projectDto.getProjectName());
        project.setLocation(projectDto.getLocation());
        project.setBudget(projectDto.getBudget());
        
        if (projectDto.getProjectStatus() != null) {
            project.setProjectStatus(ProjectStatus.valueOf(projectDto.getProjectStatus()));
        }
        
        project.setStatusMessage(projectDto.getStatusMessage());
        project.setFeedback(projectDto.getFeedback());
        project.setProjectType(projectDto.getProjectType());
        project.setAreaSqft(projectDto.getAreaSqft());
        project.setStartDate(projectDto.getStartDate());
        project.setCompletionDate(projectDto.getCompletionDate());
        project.setAddress(projectDto.getAddress());
        project.setCity(projectDto.getCity());
        project.setState(projectDto.getState());
        
        if (projectDto.getDesignerId() != null) {
            Designer designer = designerRepository.findById(projectDto.getDesignerId())
                .orElseThrow(() -> new ResourceNotFoundException("Designer not found"));
            project.setDesigner(designer);
        }
        
        projectRepository.save(project);
        return new ApiResponse("Project updated successfully", "Success");
    }
    
    @Override
    public ApiResponse deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found");
        }
        projectRepository.deleteById(id);
        return new ApiResponse("Project deleted successfully", "Success");
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> getProjectsByStatus(String status) {
        ProjectStatus projectStatus = ProjectStatus.valueOf(status.toUpperCase());
        return projectRepository.findByProjectStatus(projectStatus).stream()
            .map(this::mapToResponseDto)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> getProjectsByCustomer(Long customerId) {
        return projectRepository.findByCustomerId(customerId).stream()
            .map(this::mapToResponseDto)
            .collect(Collectors.toList());
    }
    
    private ProjectResponseDto mapToResponseDto(Project project) {
        ProjectResponseDto dto = new ProjectResponseDto();
        dto.setId(project.getId());
        dto.setProjectName(project.getProjectName());
        dto.setCustomerId(project.getCustomer().getId());
        dto.setCustomerName(project.getCustomer().getFirstName() + " " + project.getCustomer().getLastName());
        
        if (project.getDesigner() != null) {
            dto.setDesignerId(project.getDesigner().getId());
            dto.setDesignerName(project.getDesigner().getFirstName() + " " + project.getDesigner().getLastName());
        }
        
        dto.setLocation(project.getLocation());
        dto.setBudget(project.getBudget());
        dto.setProjectStatus(project.getProjectStatus().toString());
        dto.setStatusMessage(project.getStatusMessage());
        dto.setFeedback(project.getFeedback());
        dto.setProjectType(project.getProjectType());
        dto.setAreaSqft(project.getAreaSqft());
        dto.setStartDate(project.getStartDate());
        dto.setCompletionDate(project.getCompletionDate());
        dto.setAddress(project.getAddress());
        dto.setCity(project.getCity());
        dto.setState(project.getState());
        dto.setCreatedAt(project.getCreatedAt());
        dto.setUpdatedAt(project.getUpdatedAt());
        
        return dto;
    }
}