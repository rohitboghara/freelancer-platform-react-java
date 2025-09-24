package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.Profile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class EducationDto {
    private int id;
    private String course;
    private String institute;
    private String year;
    @JsonIgnore
    private Profile profile;
}
