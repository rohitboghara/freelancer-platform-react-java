package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date startDate;
    private Date endDate;
    private long amount;
    @Enumerated(EnumType.STRING)
    private ContractStatus status;

    @OneToOne
    @JoinColumn(name = "job_id")
    @JsonIgnore // Prevents infinite loop
    private Jobs jobs;

    @ManyToOne
    @JoinColumn(name = "freelancer_id", nullable = false)
    @JsonIgnore // Prevents deep nesting
    private User freelancer;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnore // Prevents deep nesting
    private User client;
}
