package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.EducationDto;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.EducationMapper;
import com.ntra.progigs.Repository.EducationRepo;
import com.ntra.progigs.Service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EducationServiceImpl implements EducationService {

    @Autowired
    private EducationRepo educationRepo;

    @Autowired
    private EducationMapper educationMapper;

    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;


    @Override
    public EducationDto addEducation(EducationDto education) {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        education.setProfile(user.getProfile());
        educationRepo.save(educationMapper.MapToEducation(education));
        return education;
    }

    @Override
    public void deleteEducation(int id) {
        educationRepo.deleteById(id);
    }
}
