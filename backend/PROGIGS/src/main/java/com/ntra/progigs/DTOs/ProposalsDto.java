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

@Data
@JsonIgnoreProperties(ignoreUnknown = true)  // ✅ Ignores unknown fields
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProposalsDto {
    private Integer id;
    private String jobTitle;
    private String clientName;
    private String freelancerName;
    private String freelancerEmail;
    private String description;
    private Long bid;
    private Date finishingTime;
    @Enumerated(value = EnumType.STRING)
    @Nullable
    private PropsalStatus status;

    @JsonIgnore
    private User user;
    @JsonIgnore
    private Jobs jobs;
}
