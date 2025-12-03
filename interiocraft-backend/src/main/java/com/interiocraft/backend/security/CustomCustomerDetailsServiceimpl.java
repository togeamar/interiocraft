package com.interiocraft.backend.security;


import java.util.Optional;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.entities.Admin;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.repository.AdminRepository;
import com.interiocraft.backend.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
@Transactional
public class CustomCustomerDetailsServiceimpl implements UserDetailsService {

    private final AdminRepository adminRepo;
    private final CustomerRepository customerRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        
        Optional<Admin> adminOpt = adminRepo.findByEmail(email);
        if (adminOpt.isPresent()) {
            return adminOpt.get();
        }

        
        Optional<Customer> custOpt = customerRepo.findByEmail(email);
        if (custOpt.isPresent()) {
            return custOpt.get();
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}

