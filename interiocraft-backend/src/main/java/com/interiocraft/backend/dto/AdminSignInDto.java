package com.interiocraft.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminSignInDto {
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
	@Size(min = 6, max = 18, message = "Password must be between 6 and 18 characters")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,100}$",
    message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
	private String password;
}
