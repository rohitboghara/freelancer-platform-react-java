package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.ProfileDto;
import com.ntra.progigs.DTOs.ProfileDtoForGet;
import com.ntra.progigs.DTOs.ProfileDtoForViewCard;
import com.ntra.progigs.Entity.LocalVariable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProfileService {
    public Map uploadImage(MultipartFile file);
    public ProfileDto editeProfile(ProfileDto profile);
    public LocalVariable updateUserSuccessRateById(int id);

    LocalVariable updateUserSuccessRate();

    public ProfileDtoForGet getProfile();


    List<ProfileDtoForGet> getUsersByCountry(String country);


    ProfileDtoForViewCard getProfileById(int id);

    String getProfileImage();
}
