package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.Profile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)  // ✅ Ignores unknown fields
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortfolioDto {
    private int portfolioId;
    private String portfolioTitle;
    private List<String> skills;
    private String description;
    @JsonIgnore
    private Profile profile;
}
