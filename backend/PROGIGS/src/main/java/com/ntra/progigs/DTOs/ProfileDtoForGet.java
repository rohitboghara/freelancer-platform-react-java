package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class ProfileDtoForGet {
    private int id;
    private String fullName;
    private String firstName;
    private String lastName;
    private String description;
    private String email;
    @Column(nullable = true)
    private String phone ;
    private String imageUrl;
    @ElementCollection
    private List<String> skills;
    //  Client detail
    private String CompanyName;
    private String fieldOfWork;
    private String Location;
    @Enumerated(value = EnumType.STRING)
    private Profile_Status status;
    //    Add ON Info
    private String hourlyRate;
    private List<Education> Education;
//    private String Articles;
    private List<Certificates> Certification;
    private BankDetails bank;
    private List<Portfolio> portfolio;
    private User user;
    private List<Review> review;


}
