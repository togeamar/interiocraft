package com.interiocraft.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.interiocraft.backend.entities.Designer;

public interface DesignerRepository extends JpaRepository<Designer, Long> {
	boolean existsByEmail(String email);
}
