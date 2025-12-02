package com.interiocraft.backend.entities;



import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "admin")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
public class Admin extends BaseEntity implements UserDetails{
    
    @NotBlank(message = "First name is required")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;
    
	@NotBlank(message="Last name is required")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;
    
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Size(max = 100, message = "Email cannot exceed 100 characters")
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
	@NotBlank
    @Column(nullable = false)
    private String password;
    
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must contain 10 to 15 digits")
    @Column(name = "phone_number", length = 15)
    private String phoneNumber;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
	}

	@Override
	public String getUsername() {
		return email;
	}
}
