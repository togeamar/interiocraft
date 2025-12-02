package com.interiocraft.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class ProjectDto {
    
    @NotBlank(message = "Project name is required")
    private String projectName;
    
    @NotNull(message = "Designer is required")
    private Long designerId;
    
    private String location;
    
    @Positive(message = "Budget must be positive")
    private BigDecimal budget;
    
    private String projectStatus;
    
    private String statusMessage;
    
    private String feedback;
    
    private String projectType;
    
    @Positive(message = "Area must be positive")
    private BigDecimal areaSqft;
    
    private LocalDate startDate;
    
    private LocalDate completionDate;
    
    private String address;
    
    private String city;
    
    private String state;
}