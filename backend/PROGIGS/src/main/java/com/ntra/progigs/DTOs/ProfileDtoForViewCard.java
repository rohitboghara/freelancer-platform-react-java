package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.*;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.List;

@Data
public class ProfileDtoForViewCard {
    private int id;
    private String fullName;
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
    private List<com.ntra.progigs.Entity.Education> Education;
    //    private String Articles;
    private List<Certificates> Certification;
    private List<Portfolio> portfolio;
    private User user;
    private List<Review> review;
}
