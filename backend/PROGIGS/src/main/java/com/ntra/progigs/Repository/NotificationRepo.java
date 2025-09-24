package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Integer> {

    List<Notification> findByReceiverIdOrderByTimestampDesc(Integer userId);
}
