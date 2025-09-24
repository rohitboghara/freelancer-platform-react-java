package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
//import jakarta.persistence.*;
import jakarta.persistence.*;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import java.util.List;

@Entity
@Data
@Table(name = "Profile")
@JsonIgnoreProperties(ignoreUnknown = true)  // ✅ Ignores unknown fields
@JsonInclude(JsonInclude.Include.NON_NULL)
public class
Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private String description;
    @Column(nullable = false, unique = true)
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;
    private String fieldOfWork;
    @Column(nullable = true)
    private String phone ;
    private String imageUrl;
    @ElementCollection
    private List<String> skills;
    //  Client detail
    private String companyName;
    private String Location;
    @Enumerated(value = EnumType.STRING)
    private Profile_Status status = Profile_Status.PENDING;
    //    Add ON Info
    private String hourlyRate;
    private boolean isVerified = false;
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Education> education;

    //    private String Articles;
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Certificates> Certification;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bank_id")
    @JsonIgnore
    private BankDetails bank;


    @OneToMany(mappedBy = "profile",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Portfolio> portfolio;


    //    this come from admin side Don't show in user site
    private String whyRejected;






    @OneToOne(mappedBy = "profile")
    @JsonIgnore
    private User user;
}