package com.interiocraft.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.custom_exception.ApiException;
import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.entities.Designer;
import com.interiocraft.backend.repository.DesignerRepository;

import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class DesignerServiceImpl implements DesignerService {

	private final DesignerRepository designerRepo;
	private final ModelMapper modelMapper;
	
	@Override
	public ApiResponse addDesigner(AddDesignerDto desdto) {
		
		if(designerRepo.existsByEmail(desdto.getEmail()))
			throw new ApiException("Designer Email Already Exists");
		
		Designer designer=modelMapper.map(desdto, Designer.class);
		
		Designer persistentDesigner=designerRepo.save(designer);
		
		return new ApiResponse("New Designer is Added with id"+persistentDesigner.getId(),"Success");
	}

}
