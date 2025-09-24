package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.ProfileDto;
import com.ntra.progigs.DTOs.ProfileDtoForGet;
import com.ntra.progigs.DTOs.ProfileDtoForViewCard;
import com.ntra.progigs.Entity.*;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.ProfileMapper;
import com.ntra.progigs.Repository.ProfileRepo;
import com.ntra.progigs.Repository.ReviewRepo;
import com.ntra.progigs.Service.ProfileService;
import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ProfileRepo repo;

    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;

    @Autowired
    private ProfileMapper profileMapper;

    @Autowired
    private ReviewRepo reviewRepo;

    @Override
    public Map uploadImage(MultipartFile file) {

        try {
           final Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
           User user = getAuthenticatedUser.getAuthenticatedUser();
            ProfileDto profile = profileMapper.MapptoProfileDto(user.getProfile());
            profile.setImageUrl(data.get("url").toString());
            repo.save(profileMapper.MapptoProfile(profile));
           return data;
        } catch (IOException e) {
            throw new RuntimeException("Image Uploading Failed !!");
        }
    }

    @Override
    public ProfileDto editeProfile(ProfileDto profileDto) {
        try {
            User user = getAuthenticatedUser.getAuthenticatedUser();
            int id = user.getProfile().getId();

            Profile existingProfile = this.repo.findById(id).get();

            existingProfile.setFirstName(profileDto.getFirstName());
            existingProfile.setLastName(profileDto.getLastName());
            existingProfile.setDescription(profileDto.getDescription());
            existingProfile.setEmail(profileDto.getEmail());
            existingProfile.setPhone(profileDto.getPhone());
            existingProfile.setSkills(profileDto.getSkills());
            existingProfile.setCompanyName(profileDto.getCompanyName());
            existingProfile.setLocation(profileDto.getLocation());
            existingProfile.setHourlyRate(profileDto.getHourlyRate());
            existingProfile.setFieldOfWork(profileDto.getFieldOfWork());
//            profile2.setArticles(profile.getArticles());
            repo.save(existingProfile);
            return profileMapper.MapptoProfileDto(existingProfile);
        }
        catch(Exception e){
            throw new RuntimeException("Profile Updation Failed !!");
        }
    }

    @Override
    public LocalVariable updateUserSuccessRateById(int id) {
        User user = repo.findById(id).get().getUser();

        int totalJobs = user.getJobs().size();
        long completedJobs = user.getJobs().stream()
                .filter(job -> "COMPLETED".equalsIgnoreCase(job.getStatus().name())) // Use .name() for enums
                .count();

        List<Review> reviews = reviewRepo.findByUser(user);

        double totalRating = reviews.stream().mapToDouble(Review::getRating).sum();
        int totalReviews = reviews.size();

        LocalVariable localVariable = new LocalVariable();
        if (reviews.isEmpty()) {
            totalRating = 0.0;
            totalReviews = 0;
        }


        // Ensure floating-point division
//        localVariable.setSuccessRate((totalJobs == 0) ? 0 : ((double) completedJobs / totalJobs) * 100);
        localVariable.setSuccessRate((totalJobs == 0) ? 0 : Math.round(((double) completedJobs / totalJobs) * 100 * 100.0) / 100.0);

        localVariable.setCompletedProject((int) completedJobs);
        localVariable.setReviewCount(totalReviews);
        localVariable.setRating((double) Math.round(((totalRating / totalReviews) * 100) /100));

        return localVariable;
    }

    @Override
    public LocalVariable updateUserSuccessRate() {
        User user = getAuthenticatedUser.getAuthenticatedUser();

        int totalJobs = user.getJobs().size();
        long completedJobs = user.getJobs().stream()
                .filter(job -> "COMPLETED".equalsIgnoreCase(job.getStatus().name())) // Use .name() for enums
                .count();

        List<Review> reviews = reviewRepo.findByUser(user);

        double totalRating = reviews.stream().mapToDouble(Review::getRating).sum();
        int totalReviews = reviews.size();

        LocalVariable localVariable = new LocalVariable();
        if (reviews.isEmpty()) {
            totalRating = 0.0;
            totalReviews = 0;
        }


        // Ensure floating-point division

       /* localVariable.setSuccessRate((totalJobs == 0) ? 0 : ((double) completedJobs / totalJobs) * 100);*/
        localVariable.setSuccessRate((totalJobs == 0) ? 0 : Math.round(((double) completedJobs / totalJobs) * 100 * 100.0) / 100.0);
        localVariable.setCompletedProject((int) completedJobs);
        localVariable.setReviewCount(totalReviews);
        localVariable.setRating((totalRating / totalReviews ));

        return localVariable;
    }

    @Override
    public ProfileDtoForGet getProfile() {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        ProfileDtoForGet profile = profileMapper.MapptoProfileDtoForGet(user.getProfile());
        return profile;
    }

    @Override
    public List<ProfileDtoForGet> getUsersByCountry(String country) {
        List<Profile> profiles = repo.findByCountry(country);
        List<ProfileDtoForGet> profileDtoForGets = profiles.stream().map(profileMapper::MapptoProfileDtoForGet).toList();
        return profileDtoForGets;
    }




    @Override
    public ProfileDtoForViewCard getProfileById(int id) {
        Profile profile = repo.findById(id).get();
        ProfileDtoForViewCard profileDtoForGet = profileMapper.MapptoProfileDtoForViewCard(profile);
        return profileDtoForGet;
    }

    @Override
    public String getProfileImage() {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        String image = user.getProfile().getImageUrl();
        return image;
    }

}
