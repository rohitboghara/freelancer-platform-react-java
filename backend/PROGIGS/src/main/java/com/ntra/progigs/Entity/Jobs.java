package com.ntra.progigs.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
@Table(name = "job")
public class Jobs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Job_ID")
    private int id;
    private String title;
    private String description;

    @ElementCollection
    private List<String> skillsRequired;

    private String duration;
    private int amount;
    @Enumerated(EnumType.STRING)
    private Pay0ut_Methods payout_methods;
    @Enumerated(EnumType.STRING)
    private Status status;// job status for biding

    @OneToMany( cascade = CascadeType.ALL)
    @JoinColumn(name = "job_id",referencedColumnName = "Job_ID")
    @JsonIgnore
    private List<Module> modules;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User user;

    @OneToMany(mappedBy = "jobs",cascade = CascadeType.ALL)
    @JsonIgnore  // Prevents circular reference
    private List<Proposals> proposals;

//    @OneToMany(mappedBy ="jobs" ,cascade = CascadeType.ALL)
//    @OrderBy("id DESC") // Newest jobs first
//    @JsonIgnore
//    private List<Review> reviews;
//
//    @OneToOne(mappedBy = "jobs")
//    @JsonIgnore
//    private Contract contracts;
}
