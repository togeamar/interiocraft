package com.interiocraft.backend.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "customer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "projects")
public class Customer extends BaseEntity {
    
	@NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;
    
	@NotBlank(message="First name is required")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;
    
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Size(max = 100, message = "Email cannot exceed 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
	@Size(min = 6, max = 18, message = "Password must be between 6 and 18 characters")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,100}$",
	    message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    @Column(nullable = false)
    private String password;
    
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must contain 10 to 15 digits")
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Project> projects = new ArrayList<>();
    
    

    public void addProject(Project project) {
        this.projects.add(project);
        project.setCustomer(this);
    }

    public void removeProject(Project project) {
        this.projects.remove(project);
        project.setCustomer(null);
    }
}

