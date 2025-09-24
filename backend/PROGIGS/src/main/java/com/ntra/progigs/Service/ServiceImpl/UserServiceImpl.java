package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.UserDto;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Entity.UserRole;
import com.ntra.progigs.Exception.NoContentException;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.UserMapper;
import com.ntra.progigs.Repository.UserRepo;
import com.ntra.progigs.Service.ProfileService;
import com.ntra.progigs.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.ntra.progigs.Entity.UserRole.FREELANCER;

@Service

@AllArgsConstructor

public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo repo;

    @Autowired
    private ProfileService profileService;

    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;
@Autowired
private UserMapper userMapper;
    @Override
    public List<UserDto> getAllFreelancer(){

        try {
            List<User> users =repo.findAllByRole(FREELANCER);
            return users.stream().map(userMapper::mapToUserDtoCard).toList();
        }catch (NoContentException e){
            throw new NoContentException("No_Content");
        }
    }
    @Override
    public List<UserDto> getAllFreelancerBySkill(String skill){

        try {
            List<UserDto> userDtos = repo.findBySkillOrFieldOfWork(skill, String.valueOf(FREELANCER)).stream().map(userMapper::mapToUserDtoCard).toList();
            return userDtos;
        }catch (NoContentException e){
            throw new NoContentException("Freelancer not found By Skill: "+skill);
        }
    }

    @Override
    public List<UserDto> getAllFreelancerByLocation(String country){

        try {
            List<UserDto> userDtos = repo.findByCountry(country, FREELANCER).stream().map(userMapper::mapToUserDtoCard).toList();
            return userDtos;
        }catch (NoContentException e){
            throw new NoContentException("Freelancer not found By Country: "+country);
        }
    }
    @Override
    public List<UserDto> getTopFreelancer(){

        try {
            List<User> users =repo.findAllByRole(FREELANCER);
            List<UserDto> userDtos = users.stream().map(userMapper::mapToUserDtoCard).filter(u -> u.getProfileDtoForCard().getRating() > 0.0)
                    .collect(Collectors.toList());
            return userDtos.stream().sorted(Comparator.comparing((UserDto userDto) -> userDto.getProfileDtoForCard().getRating()).reversed()).limit(6).collect(Collectors.toList());

        }
        catch (NoContentException e){
            throw new NoContentException("No_Content");
        }

    }

    @Override
    public List<UserDto> searchFreelancer(String keyword){

        try {
            List<User> users =repo.searchUsers(keyword, FREELANCER);
            List<UserDto> userDtos = users.stream().map(userMapper::mapToUserDtoCard).toList();
            return userDtos;
        }
        catch (NoContentException e){
            throw new NoContentException("No_Content");
        }
    }

    @Override
    public List<UserDto> getInternationalClients() {
        String location = getAuthenticatedUser.getAuthenticatedUser().getProfile().getLocation();
        String country = location.split(",")[1].trim();
        List<User> users = repo.findByNotCountry(country, UserRole.FREELANCER);
        List<UserDto> userDtos = users.stream().map(userMapper::mapToUserDtoCard).toList();
        return userDtos;

    }

}
