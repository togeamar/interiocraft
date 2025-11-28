package com.interiocraft.backend.entities;


import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = {"customer", "designer", "images"})
public class Project extends BaseEntity {
    
    @Column(name = "project_name", nullable = false, length = 150)
    private String projectName;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "designer_id")
    private Designer designer;
    
    @Column(columnDefinition = "TEXT")
    private String location;
    
    @Column(precision = 12, scale = 2)
    private BigDecimal budget;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "project_status", length = 50)
    private ProjectStatus projectStatus;
    
    @Column(name = "status_message", columnDefinition = "TEXT")
    private String statusMessage;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;
    
    @Column(name = "project_type", length = 50)
    private String projectType;
    
    @Column(name = "area_sqft", precision = 10, scale = 2)
    private BigDecimal areaSqft;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "completion_date")
    private LocalDate completionDate;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    @Column(length = 100)
    private String city;
    
    @Column(length = 100)
    private String state;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectImage> images = new ArrayList<>();
}