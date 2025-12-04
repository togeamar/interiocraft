package com.interiocraft.backend.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.interiocraft.backend.entities.Admin;
import com.interiocraft.backend.entities.Customer;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtUtils {
	@Value("${jwt.secret.key}")
    private String secretKey;
    
    @Value("${jwt.expiration}")
    private long expTime;
    
    private SecretKey key;
    
    @PostConstruct
    public void myInit() {
     
        key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }
    
    public String generateToken(Object principal) {
    	UserDetails user = (UserDetails) principal;
        
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expTime);
        
        String role = user.getAuthorities()
                .iterator()
                .next()
                .getAuthority();
        
        Long userId = null;

        if (principal instanceof Customer cust) {
            userId = cust.getId();
        } else if (principal instanceof Admin admin) {
            userId = admin.getId();
        }
        
        return Jwts.builder()
            .subject(user.getUsername())         
            .issuedAt(now)                    
            .expiration(expiryDate)                
            .claims(Map.of(                       
                "user_id", userId,
                "role", role
            ))
            .signWith(key)                    
            .compact();                      
    }
    public Claims validateToken(String jwt) {
        return Jwts.parser()
            .verifyWith(key)                      
            .build()
            .parseSignedClaims(jwt)             
            .getPayload();                        
    }
}
