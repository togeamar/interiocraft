package com.interiocraft.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.interiocraft.backend.entities.Project;
import com.interiocraft.backend.entities.ProjectStatus;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    List<Project> findByProjectStatus(ProjectStatus status);
    
    List<Project> findByCustomerId(Long customerId);
    
    List<Project> findByDesignerId(Long designerId);
    
    @Query("SELECT p FROM Project p WHERE p.projectName LIKE %:name%")
    List<Project> findByProjectNameContaining(@Param("name") String name);
}