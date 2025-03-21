package com.julytus.DropShop.service.implement;

import com.julytus.DropShop.dto.request.AddressRequest;
import com.julytus.DropShop.model.Address;
import com.julytus.DropShop.repository.AddressRepository;
import com.julytus.DropShop.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {
    private final AddressRepository addressRepository;

    @Override
    public Address create(AddressRequest request) {
        Address address = Address.builder()
                .country(request.getCountry())
                .city(request.getCity())
                .street(request.getStreet())
                .district(request.getDistrict())
                .number(request.getNumber())
                .zip(request.getZip())
                .build();
        return addressRepository.save(address);
    }
}
