package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.*;
import com.ntra.progigs.Entity.Module;
import jakarta.persistence.ElementCollection;
import lombok.Data;

import java.util.List;

@Data
public class JobDto {

    private int id;
    private String title;
    private String description;
    @ElementCollection
    private List<String> skillsRequired;
    private String duration;
    private int amount;
    private Pay0ut_Methods payout_methods;
    private Status status;
    private List<Module> modules;
//    @JsonIgnoreProperties(ignoreUnknown = true)  // ✅ Ignores unknown fields
//    @JsonInclude(JsonInclude.Include.NON_NULL)
    private ClientDetailsForJobDTO client;
}
