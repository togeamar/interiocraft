package com.interiocraft.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {
        
        // Step 1: Check if request has Authorization header
        String headerValue = request.getHeader("Authorization");
        
        if (headerValue != null && headerValue.startsWith("Bearer ")) {
            log.info("JWT token found in request");
            
            // Step 2: Extract token (remove "Bearer " prefix)
            String jwt = headerValue.substring(7);
            
            // Step 3: Validate token and extract claims
            Claims claims = jwtUtils.validateToken(jwt);
            
            // Step 4: Extract user info from token
            Long userId = claims.get("user_id", Long.class);
            String email = claims.getSubject();
            String role = claims.get("role", String.class);
            
            // Step 5: Create Authentication object
            JwtDTO dto = new JwtDTO(userId, email, role);
            UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(
                    dto,                                      // Principal (user info)
                    null,                                     // Credentials (not needed)
                    List.of(new SimpleGrantedAuthority("ROLE_" + role)) // Authorities
                );
            
            // Step 6: Store authentication in Security Context
            // Now Spring Security knows: "This request is from an authenticated user"
            SecurityContextHolder.getContext().setAuthentication(authToken);
            
            log.info("User authenticated: {} with role: {}", email, role);
        }
        
        // Step 7: Continue to next filter/controller
        filterChain.doFilter(request, response);
    }
}