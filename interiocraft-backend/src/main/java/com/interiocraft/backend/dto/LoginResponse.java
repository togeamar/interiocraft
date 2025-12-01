package com.interiocraft.backend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LoginResponse{
	private LocalDateTime timeStamp;
	private String message;
	private String status;
	private String jwt;
	private String username;
	private String email;
	public LoginResponse(String message, String status,String jwt,String username,String email) {
		super();
		this.message = message;
		this.status = status;
		this.jwt=jwt;
		this.username=username;
		this.email=email;
		this.timeStamp=LocalDateTime.now();
	}	
}