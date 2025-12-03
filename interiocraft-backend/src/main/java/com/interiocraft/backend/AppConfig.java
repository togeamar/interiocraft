package com.interiocraft.backend;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.interiocraft.backend.dto.ProjectResponseDto;
import com.interiocraft.backend.entities.Project;

@Configuration
public class AppConfig {
	@Bean
    public ModelMapper modelMapper() {
ModelMapper modelMapper = new ModelMapper();
        
        // 2. Use STRICT strategy. 
        // This stops ModelMapper from "guessing" ambiguous fields like customerName.
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        
        // 3. Return the VARIABLE, not the method name!
        return modelMapper;
    }
}
