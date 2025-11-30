package com.interiocraft.backend.service;

import org.springframework.stereotype.Service;

import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.ApiResponse;


public interface AdminService {
	ApiResponse adminRegister(AdminRegDto admindto);
}
