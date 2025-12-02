package com.interiocraft.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class InteriocraftBackendApplication {

	public static void main(String[] args) {
		 System.out.println("========================================");
	        System.out.println("APPLICATION STARTING - NEW VERSION");
	        System.out.println("========================================");
		SpringApplication.run(InteriocraftBackendApplication.class, args);
	}

}
