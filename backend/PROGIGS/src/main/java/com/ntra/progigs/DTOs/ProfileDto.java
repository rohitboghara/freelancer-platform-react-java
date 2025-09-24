package com.ntra.progigs.DTOs;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
public class ProfileDto {
    private int id;
    private String firstName;
    private String lastName;
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
    //    Add ON Info
    private String hourlyRate;
//    private String Articles;
}
