package com.ntra.progigs.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int id;
    private String senderName;
    private String title;
    private String message;
    private String Link;
    private String timestamp;
    @ManyToOne
    @JoinColumn(name = "freelancer_id", nullable = false)
    @JsonIgnore // Prevents deep nesting
    private User receiver;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnore // Prevents deep nesting
    private User sender;
}
