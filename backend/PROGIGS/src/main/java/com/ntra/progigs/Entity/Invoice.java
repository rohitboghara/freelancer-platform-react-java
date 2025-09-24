package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String clientCompanyName;
    private String clientName;
    private String freelancerName;
    private long portalFee;
    private Date date;

    @OneToOne(mappedBy = "invoice")
    @JsonIgnore // Prevents circular reference
    private Module module;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;
}
