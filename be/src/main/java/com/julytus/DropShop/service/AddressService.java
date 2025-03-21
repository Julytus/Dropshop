package com.julytus.DropShop.service;

import com.julytus.DropShop.dto.request.AddressRequest;
import com.julytus.DropShop.model.Address;

public interface AddressService {
    Address create(AddressRequest request);
}
