package com.interiocraft.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.lang.NonNull;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.interiocraft.backend.dto.JwtDTO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomJwtFilter extends OncePerRequestFilter {
    
    private final JwtUtils jwtUtils;
    
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        
    
        String headerValue = request.getHeader("Authorization");
        
        if (headerValue != null && headerValue.startsWith("Bearer ")) {
            log.info("JWT token found in request");
            
            
            String jwt = headerValue.substring(7);
            
         
            Claims claims = jwtUtils.validateToken(jwt);
            
        
            Long userId = claims.get("user_id", Long.class);
            String email = claims.getSubject();
            String role = claims.get("role", String.class);
            
           
            JwtDTO dto = new JwtDTO(userId, email, role);
            UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(
                    dto,                                
                    null,                                  
                    List.of(new SimpleGrantedAuthority(role)) 
                );
            
            
            SecurityContextHolder.getContext().setAuthentication(authToken);
            
            log.info("User authenticated: {} with role: {}", email, role);
        }
        
       
        filterChain.doFilter(request, response);
    }
}