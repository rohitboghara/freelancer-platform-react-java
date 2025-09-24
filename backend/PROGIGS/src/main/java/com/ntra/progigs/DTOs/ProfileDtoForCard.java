package com.ntra.progigs.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class ProfileDtoForCard {
    private int id;
    private String fullName;
    private String fieldOfWork;
    private List<String> skills;
    private String imageUrl;
    private String Location;
    private String hourlyRate;
    private double rating;
    private int reviewCount;
    private double successRate;
}
