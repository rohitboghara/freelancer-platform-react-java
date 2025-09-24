package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.NotificationDto;
import com.ntra.progigs.Entity.Notification;
import com.ntra.progigs.Entity.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    @Autowired
    public ModelMapper modelMapper;

    public NotificationDto mapToDto(Notification notification) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        NotificationDto dto = modelMapper.map(notification, NotificationDto.class);
        dto.setSenderName(notification.getSender().getUsername());
        return dto;
    }

    public Notification mapToEntity(NotificationDto dto, User sender, User receiver) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        Notification notification = modelMapper.map(dto, Notification.class);
        notification.setSender(sender);
        notification.setReceiver(receiver);
        return notification;
    }
}
