package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.Jobs;
import com.ntra.progigs.Entity.PropsalStatus;
import com.ntra.progigs.Entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)  // ✅ Ignores unknown fields
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProposalsDtoForGet {
    private int id;
    private String description;
    private Long bid;//price

    private Date finishingTime;//duration
    @Enumerated(value = EnumType.STRING)
    @Nullable
    private PropsalStatus status;
    private String name;//freelancer name
    private String username;
    private double  rating;
    private int reviews;
    private double successRate;
    private List<String> expertise;
    private String country;
    private String image;
@JsonIgnore
private User user;
@JsonIgnore
private Jobs jobs;
}
