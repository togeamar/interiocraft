package com.interiocraft.entities;


import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "designer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "projects")
public class Designer extends BaseEntity {
    
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;
    
    @Column(name = "experience_years")
    private Integer experienceYears;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal rating;
    
    @Column(name = "total_projects_completed")
    private Integer totalProjectsCompleted = 0;
    
    @Column(name = "is_available")
    private Boolean isAvailable = true;
    
    @OneToMany(mappedBy = "designer", cascade = CascadeType.ALL)
    private List<Project> projects = new ArrayList<>();
}