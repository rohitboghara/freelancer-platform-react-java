package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.ProfileDto;
import com.ntra.progigs.DTOs.ProfileDtoForGet;
import com.ntra.progigs.DTOs.ProfileDtoForViewCard;
import com.ntra.progigs.Entity.Profile;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {
    @Autowired
    private ModelMapper modelMapper;

//    Entity To Dto


//    Entity To Dto for post mapping
    public ProfileDto MapptoProfileDto(Profile profile) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        ProfileDto profileDto = new ProfileDto();
        profileDto = new ModelMapper().map(profile, ProfileDto.class);
        profileDto.setFullName(profile.getFirstName() + " " + profile.getLastName());
        return profileDto;
    }

//    Entity To Dto for get mapping
    public ProfileDtoForGet MapptoProfileDtoForGet(Profile profile) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        ProfileDtoForGet profileDtoForGet = new ProfileDtoForGet();
        profileDtoForGet = new ModelMapper().map(profile, ProfileDtoForGet.class);
        profileDtoForGet.setFullName(profile.getFirstName() + " " + profile.getLastName());
        profileDtoForGet.setReview(profile.getUser().getReviews());
        return profileDtoForGet;
    }
//    Entity To Dto for get mapping
    public ProfileDtoForViewCard MapptoProfileDtoForViewCard(Profile profile) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        ProfileDtoForViewCard profileDtoForViewCard = new ProfileDtoForViewCard();
        profileDtoForViewCard = new ModelMapper().map(profile, ProfileDtoForViewCard.class);
        profileDtoForViewCard.setFullName(profile.getFirstName() + " " + profile.getLastName());
        profileDtoForViewCard.setReview(profile.getUser().getReviews());
        return profileDtoForViewCard;
    }


//    Dto To Entity for post mapping
    public Profile MapptoProfile(ProfileDto profileDto) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        Profile profile = new Profile();
        profile = new ModelMapper().map(profileDto, Profile.class);
        return profile;
    }
}
