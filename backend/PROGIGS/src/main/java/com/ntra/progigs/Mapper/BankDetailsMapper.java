package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.BankDetailsDTO;
import com.ntra.progigs.Entity.BankDetails;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BankDetailsMapper {
    @Autowired
    private ModelMapper modelMapper;

    public BankDetailsDTO bankDetailsToDTO(BankDetails bankDetails){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(bankDetails, BankDetailsDTO.class);
    }

    public BankDetails DTOToBankDetails(BankDetailsDTO bankDetailsDTO){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(bankDetailsDTO, BankDetails.class);
    }
}
