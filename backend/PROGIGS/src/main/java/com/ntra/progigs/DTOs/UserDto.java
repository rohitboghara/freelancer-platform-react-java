package com.ntra.progigs.DTOs;

import com.ntra.progigs.Entity.UserRole;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDto{

    private Integer id;
    private String username;
    private LocalDate joiningDate;
    @Enumerated(value = EnumType.STRING)
    private UserRole role;
    private ProfileDtoForCard profileDtoForCard;
}
