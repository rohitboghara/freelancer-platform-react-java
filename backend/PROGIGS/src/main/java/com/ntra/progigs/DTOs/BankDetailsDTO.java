package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.Profile;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data

public class BankDetailsDTO {
    private int id;
    private String bankName;
    private String accountHolderName;
    @Pattern(regexp = "\\d{11}", message = "Account number must be exactly 12 digits.")
    @Size(min = 11, max = 11, message = "Account number must be exactly 12 digits.")
    private String accountNumber;
    private String ifscCode;
    private String branch;
    @JsonIgnore
    private Profile profile;


    // Getter to return the masked account number in API responses
    public String getAccountNumber() {
        if (this.accountNumber != null && this.accountNumber.length() == 11) {
            return "*******" + this.accountNumber.substring(7);
        }
        return null;
    }
}
