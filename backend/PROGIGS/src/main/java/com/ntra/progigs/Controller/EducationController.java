package com.ntra.progigs.Controller;

import com.ntra.progigs.DTOs.EducationDto;
import com.ntra.progigs.Service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/profile/education")
public class EducationController {
    @Autowired
    private EducationService educationService;

    @PostMapping
    public EducationDto addEducation(@RequestBody EducationDto education) {
        educationService.addEducation(education);
        return education;
    }

    @DeleteMapping("/{id}")
    public void editEducation(@PathVariable int id){
        educationService.deleteEducation(id);
    }
}
