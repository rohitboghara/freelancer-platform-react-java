package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.CertificateDto;
import com.ntra.progigs.Entity.Certificates;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CertificateMapper {

    @Autowired
    public ModelMapper modelMapper;

    public CertificateDto MapToDto(Certificates certificates){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        CertificateDto certificateDto = new CertificateDto();
        certificateDto = new ModelMapper().map(certificates,CertificateDto.class);
        return certificateDto;
    }

    public Certificates MapToCertificates(CertificateDto certificateDto){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        Certificates certificates = new Certificates();
        certificates = new ModelMapper().map(certificateDto,Certificates.class);
        return certificates;
    }
}
