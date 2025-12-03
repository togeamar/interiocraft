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
		
		if (designer == null) {
			throw new ApiException("Failed to map Designer DTO to Entity");
		}
		
		Designer persistentDesigner=designerRepo.save(designer);
		
		return new ApiResponse("New Designer is Added with id"+persistentDesigner.getId(),"Success");
	}

	@Override
	public java.util.List<Designer> getAllDesigners() {
		return designerRepo.findAll();
	}

	@Override
	public ApiResponse updateDesigner(Long id, AddDesignerDto desdto) {
		if (id == null) throw new IllegalArgumentException("ID cannot be null");
		Designer designer = designerRepo.findById(id)
				.orElseThrow(() -> new com.interiocraft.backend.custom_exception.ResourceNotFoundException("Designer not found"));
		
		designer.setFullName(desdto.getFullName());
		designer.setEmail(desdto.getEmail());
		designer.setPhoneNumber(desdto.getPhoneNumber());
		designer.setExperienceYears(desdto.getExperienceYears());
		
		designerRepo.save(designer);
		return new ApiResponse("Designer updated successfully", "Success");
	}

	@Override
	public ApiResponse deleteDesigner(Long id) {
		if (id == null) throw new IllegalArgumentException("ID cannot be null");
		if (!designerRepo.existsById(id)) {
			throw new com.interiocraft.backend.custom_exception.ResourceNotFoundException("Designer not found");
		}
		designerRepo.deleteById(id);
		return new ApiResponse("Designer deleted successfully", "Success");
	}
}
