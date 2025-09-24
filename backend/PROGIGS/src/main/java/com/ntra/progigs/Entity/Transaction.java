package com.ntra.progigs.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String clientName;
    private String freelancerName;
    private String amount;
    private LocalDate transactionDate;
    private String jobTitle;
    private String jobDescription;
    @OneToOne(mappedBy = "transaction")
    private Invoice invoice;
}
