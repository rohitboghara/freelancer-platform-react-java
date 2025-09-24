package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "bank_details")

public class BankDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String bankName;
    private String accountHolderName;
    @Pattern(regexp = "\\d{11}", message = "Account number must be exactly 11 digits.")
    @Size(min = 11, max = 11, message = "Account number must be exactly 11 digits.")
    private String accountNumber;
    private String ifscCode;
    private String branch;
    @OneToOne(mappedBy = "bank")
    @JsonIgnore
    private Profile profile;



}
