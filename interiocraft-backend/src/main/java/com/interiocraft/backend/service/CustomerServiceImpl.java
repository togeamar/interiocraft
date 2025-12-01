package com.interiocraft.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.interiocraft.backend.custom_exception.ApiException;
import com.interiocraft.backend.dto.ApiResponse;
import com.interiocraft.backend.dto.CustomerLoginResponseDto;
import com.interiocraft.backend.dto.CustomerRegDto;
import com.interiocraft.backend.dto.CustomerSignInDto;
import com.interiocraft.backend.entities.Customer;
import com.interiocraft.backend.repository.CustomerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepo;
    private final ModelMapper modelMapper;

    @Override
    public ApiResponse customerRegister(CustomerRegDto regdto) {

        if (customerRepo.existsByEmail(regdto.getEmail())) {
            throw new ApiException("Email already registered");
        }

        Customer entity = modelMapper.map(regdto, Customer.class);
        Customer saved = customerRepo.save(entity);

        return new ApiResponse(
                "New Customer Registered with ID=" + saved.getId(),
                "Success"
        );
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerLoginResponseDto customerSignIn(CustomerSignInDto custindto) {

        Customer customer = customerRepo.findByEmailAndPassword(
                custindto.getEmail(), custindto.getPassword()
        );

        if (customer == null) {
            throw new ApiException("Invalid email or password");
        }

        CustomerLoginResponseDto dto = new CustomerLoginResponseDto();
        dto.setId(customer.getId());
        dto.setFirstName(customer.getFirstName());
        dto.setLastname(customer.getLastName());
        dto.setEmail(customer.getEmail());
        dto.setPhoneNumber(customer.getPhoneNumber());

        return dto;
    }
}
