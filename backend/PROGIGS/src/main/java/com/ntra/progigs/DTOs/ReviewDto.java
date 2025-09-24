package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.Jobs;
import com.ntra.progigs.Entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ReviewDto {

    private int contractId;
    @JsonIgnore
    private String reviewerName;
    private String review;
    private double rating;
    @JsonIgnore
    private Jobs jobs;
    @JsonIgnore
    private User user;
}
