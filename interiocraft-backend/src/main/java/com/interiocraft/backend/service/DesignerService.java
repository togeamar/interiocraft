package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.ApiResponse;

public interface DesignerService {
	ApiResponse addDesigner(AddDesignerDto desdto);
	
	java.util.List<com.interiocraft.backend.entities.Designer> getAllDesigners();
	
	ApiResponse updateDesigner(Long id, AddDesignerDto desdto);
	
	ApiResponse deleteDesigner(Long id);
}
