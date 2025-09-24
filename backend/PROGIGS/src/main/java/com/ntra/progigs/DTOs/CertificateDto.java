package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.Profile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class CertificateDto {
    private Integer id;
    private String certificateName;
    private String certificateIssuer;
    private String issuedDate;
    @JsonIgnore
    private Profile profile;
}
