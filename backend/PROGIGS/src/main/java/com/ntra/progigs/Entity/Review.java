package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    private String reviewerName;
    private String review;
    private double rating;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    @JsonIgnore // Prevents infinite recursion
    private Jobs jobs;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore // Prevents deep nesting
    private User user;
}
