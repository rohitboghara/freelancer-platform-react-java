package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "Portfolio")
public class Portfolio implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer portfolioId;
    @Column(name = "PortfolioTitle")
    private String portfolioTitle;
   @Column(name = "Skills")
   @ElementCollection
   private List<String> skills;
   @Column(name = "Description")
   private String description;
   @Column(name = "PortfolioImage")
    private String portfolioImage;

   @ManyToOne
   @JoinColumn(name = "profile_id")
   @JsonIgnore
    private Profile profile;
}
