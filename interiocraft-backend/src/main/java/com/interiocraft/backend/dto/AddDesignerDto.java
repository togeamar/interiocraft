package com.interiocraft.backend.dto;



import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddDesignerDto {

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
	
	private boolean isAvailable=true;
    
   
}
