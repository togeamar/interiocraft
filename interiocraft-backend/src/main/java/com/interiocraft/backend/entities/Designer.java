package com.interiocraft.backend.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "designer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "currentProject")
public class Designer extends BaseEntity {
    
	@NotBlank
    @Column(name = "name", nullable = false, length = 100)
    private String fullName;
    
	@Email
	@NotBlank
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
	@NotBlank
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must contain 10 to 15 digits")
    @Column(name = "number", length = 15)
    private String phoneNumber;
    
	@NotNull
    @Column(name = "experience")
    private Integer experienceYears;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal rating=BigDecimal.ZERO;
    
    @Column(name = "total_projects_completed")
    private Integer totalProjectsCompleted = 0;
    
    private boolean isAvailable;
    
    @com.fasterxml.jackson.annotation.JsonIgnore
    @OneToOne(mappedBy="designer")
    private Project currentProject;
}