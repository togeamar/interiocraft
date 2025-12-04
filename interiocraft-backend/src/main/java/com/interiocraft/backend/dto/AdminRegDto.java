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
public class AdminRegDto {
	@NotBlank(message = "First name is required")
	private String firstName;
	@NotBlank(message="Last name is required")
	private String lastName;
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	@Size(max = 100, message = "Email cannot exceed 100 characters")
	private String email;
	@Size(min = 6, max = 18, message = "Password must be between 6 and 18 characters")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,100}$",
	    message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
	private String password;
	@Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must contain 10 to 15 digits")
	private String phoneNumber;
}
