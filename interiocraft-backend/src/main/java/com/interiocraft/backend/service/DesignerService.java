package com.interiocraft.backend.service;

import com.interiocraft.backend.dto.AddDesignerDto;
import com.interiocraft.backend.dto.ApiResponse;

public interface DesignerService {
	ApiResponse addDesigner(AddDesignerDto desdto);
}
