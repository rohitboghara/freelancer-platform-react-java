package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.UserDto;

import java.util.List;


public interface UserService {

    List<UserDto> getAllFreelancer();

    List<UserDto> getAllFreelancerBySkill(String skill);

    List<UserDto> getAllFreelancerByLocation(String country);

    List<UserDto> getTopFreelancer();

    List<UserDto> searchFreelancer(String keyword);

    List<UserDto> getInternationalClients();
}
