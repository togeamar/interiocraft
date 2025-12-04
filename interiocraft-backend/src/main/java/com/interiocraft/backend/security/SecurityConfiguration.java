package com.interiocraft.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  
@RequiredArgsConstructor
public class SecurityConfiguration {
    
    
    private final CustomJwtFilter customJwtFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        http
            
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                corsConfiguration.setAllowedOrigins(java.util.List.of("*"));
                corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                corsConfiguration.setAllowedHeaders(java.util.List.of("*"));
                return corsConfiguration;
            }))
            
           
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
           
            .authorizeHttpRequests(auth -> auth
                
                
                .requestMatchers(
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/customer/signin",
                    "/customer/test",
                    "/customer/signup",
                    "/Admin/signin",
                    "/Admin/AddAdmin",
                    "/Admin/AddDesigner",
                    "/Project/addProject/{email}",
                    "/images/**",
                    "Project/projects"
                ).permitAll()
                
                
                .requestMatchers(HttpMethod.POST, "/adddesigner")
                    .hasRole("Admin")  
                
                .requestMatchers(HttpMethod.POST, "/customer/**")
                    .hasRole("CUSTOMER")  
                
                .requestMatchers("/Admin/designers")
                    .hasRole("ADMIN")    
                
               
                .anyRequest().authenticated()
            )
            
            
            .addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
    

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) 
            throws Exception {
        return config.getAuthenticationManager();
    }
    
    

}