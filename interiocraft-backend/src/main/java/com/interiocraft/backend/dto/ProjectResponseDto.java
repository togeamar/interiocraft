package com.interiocraft.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class ProjectResponseDto {
    
    private Long id;
    private String projectName;
    private Long customerId;
    private String customerName;
    private Long designerId;
    private String designerName;
    private String location;
    private BigDecimal budget;
    private String projectStatus;
    private String statusMessage;
    private String feedback;
    private String projectType;
    private BigDecimal areaSqft;
    private LocalDate startDate;
    private LocalDate completionDate;
    private String address;
    private String city;
    private String state;
    private LocalDate createdAt;
    private LocalDateTime updatedAt;
    private List<String> imageUrls;
}