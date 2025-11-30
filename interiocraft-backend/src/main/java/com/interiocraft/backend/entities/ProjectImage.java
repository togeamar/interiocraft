package com.interiocraft.backend.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "project_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = "project")
public class ProjectImage extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;
    
    @Column(name = "image_name", nullable = false, length = 200)
    private String imageName;
    
    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;
}