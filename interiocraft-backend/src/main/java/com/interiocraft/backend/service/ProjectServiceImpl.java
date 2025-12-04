package com.interiocraft.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.interiocraft.backend.custom_exception.ResourceNotFoundException;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.ProjectDto;
import com.interiocraft.backend.dto.ProjectResponseDto;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.entities.Designer;
import com.interiocraft.backend.entities.Project;
import com.interiocraft.backend.entities.ProjectImage;
import com.interiocraft.backend.entities.ProjectStatus;
import com.interiocraft.backend.repository.CustomerRepository;
import com.interiocraft.backend.repository.DesignerRepository;
import com.interiocraft.backend.repository.ProjectRepository;

import ch.qos.logback.classic.Logger;

import org.springframework.util.StringUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    
    private final ProjectRepository projectRepository;
    private final CustomerRepository customerRepository;
    private final DesignerRepository designerRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse createProject(String customerEmail,ProjectDto projectDto,MultipartFile[] files) {
    	System.out.println("in create project");
        Customer customer = customerRepository.findByEmail(customerEmail)
            .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        
        Project project = modelMapper.map(projectDto, Project.class);
        project.setProjectStatus(ProjectStatus.REQUESTED);

        try {
        	Path uploadPath = Paths.get("uploads/");
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            for (MultipartFile file : files) {
            	
            	log.info("This is an informational message."+files.length);
                String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
                String fileName = UUID.randomUUID().toString() + "_" + originalFilename;
                Path filePath = uploadPath.resolve(fileName);
                
                
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                
                ProjectImage projectImage = new ProjectImage();
                projectImage.setImageName(originalFilename);
                projectImage.setImageUrl("http://localhost:8080/images/" + fileName);
                
                
                project.addProjectImage(projectImage); 
                
            }
        } catch (IOException e) {
            return new ApiResponse("upload failed", "Failure");
        }
        project.setCustomer(customer);
        
        System.out.println(project);
       
        Long designerId = projectDto.getDesignerId();
        if (designerId != null) {
            Designer designer = designerRepository.findById(designerId)
                .orElseThrow(() -> new ResourceNotFoundException("Designer not found"));
            project.setDesigner(designer);
            
            if(designer.isAvailable()) {
                projectRepository.save(project);
                return new ApiResponse("Project created successfully", "Success");
            }
            else {
                return new ApiResponse("Designer is not Available", "Failure");
            }
        } else {
             projectRepository.save(project);
             return new ApiResponse("Project created successfully", "Success");
        }
    }
    
    @Override
    @Transactional(readOnly = true)
    public ProjectResponseDto getProjectById(Long id) {
        if (id == null) throw new IllegalArgumentException("ID cannot be null");
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        return mapToResponseDto(project);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> getAllProjects() {
        return projectRepository.findAllWithDetails().stream()
            .map(this::mapToResponseDto)
            .filter(dto -> dto != null)
            .collect(Collectors.toList());
    }
    
    

    
    @Override
    public ApiResponse updateProject(Long id, ProjectDto projectDto) {
    	modelMapper.getConfiguration().setSkipNullEnabled(true);
    	
    	Designer designer=null;
    	Long designerId = projectDto.getDesignerId();
        if (designerId != null) {
            designer = designerRepository.findById(designerId)
                .orElseThrow(() -> new ResourceNotFoundException("Designer not found"));
            System.out.println("3. Designer found: " + designer.getFullName());
            System.out.println("4. Designer isAvailable(): " + designer.isAvailable());
            if(!designer.isAvailable()) {
            	throw new ResourceNotFoundException("Designer is not available");
            }
            
        }
    	
        if (id == null) throw new IllegalArgumentException("ID cannot be null");
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
        
        modelMapper.map(projectDto,project);
        
        
        if (projectDto.getProjectStatus() != null) {
            project.setProjectStatus(ProjectStatus.valueOf(projectDto.getProjectStatus()));
        }
        
        if (designer != null) {
            project.setDesigner(designer);
            project.changeDesignerstatus(designer);
        }
        
        
        projectRepository.save(project);
        return new ApiResponse("Project updated successfully", "Success");
    }
    
    @Override
    public ApiResponse deleteProject(Long id) {
        if (id == null) throw new IllegalArgumentException("ID cannot be null");
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
            .filter(dto -> dto != null)
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponseDto> getProjectsByCustomer(Long customerId) {
        if (customerId == null) throw new IllegalArgumentException("Customer ID cannot be null");
        return projectRepository.findByCustomerId(customerId).stream()
            .map(this::mapToResponseDto)
            .filter(dto -> dto != null)
            .collect(Collectors.toList());
        
    }
    
    private ProjectResponseDto mapToResponseDto(Project project) {
    	ProjectResponseDto dto = modelMapper.map(project, ProjectResponseDto.class);
        log.info("fsfscsfs"+project.toString());
        if(project.getCustomer()!=null) {
        	dto.setCustomerName(project.getCustomer().getFirstName()+" "+project.getCustomer().getLastName());
        }
        if (project.getDesigner() != null) {
            dto.setDesignerName(project.getDesigner().getFullName());
        }
        
        if (project.getImages() != null) {
            dto.setImageUrls(project.getImages().stream()
                .map(ProjectImage::getImageUrl)
                .collect(Collectors.toList()));
        }
        
        return dto;
    }
}