package com.interiocraft.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.custom_exception.ApiException;
import com.interiocraft.backend.dto.AdminRegDto;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.entities.Admin;
import com.interiocraft.backend.repository.AdminRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

	private final AdminRepository adminRepo;
	
	private final ModelMapper modelMapper;
	
	
	@Override
	public ApiResponse adminRegister(AdminRegDto admindto) {
		
		if(adminRepo.existsByEmail(admindto.getEmail()))
			throw new ApiException("email is not valid");
			
		Admin entity =modelMapper.map(admindto, Admin.class);
		
		Admin persistentEntity=adminRepo.save(entity);
		return new ApiResponse("New Admin Has beedn added by the Id"+persistentEntity.getId(),"Success");
	}

}
