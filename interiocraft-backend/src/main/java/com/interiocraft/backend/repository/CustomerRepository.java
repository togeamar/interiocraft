package com.interiocraft.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interiocraft.backend.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
	
	boolean existsByEmail(String email);
	
	Customer findByEmailAndPassword(String email,String password);
	
	Optional<Customer> findByEmail(String email);
}
