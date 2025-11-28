package com.interiocraft.backend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class CustomerRegDto {
	private String firstName;
	private String lastname;
	private String email;
	private String password;
	private String phoneNumber;
}
