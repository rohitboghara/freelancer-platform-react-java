package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.EducationDto;

public interface EducationService {
    public EducationDto addEducation(EducationDto education);


    void deleteEducation(int id);
}
