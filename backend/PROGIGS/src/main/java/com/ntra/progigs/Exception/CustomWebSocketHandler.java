package com.ntra.progigs.Exception;

import com.ntra.progigs.DTOs.NotificationDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.concurrent.ConcurrentHashMap;
@Component
public class CustomWebSocketHandler extends TextWebSocketHandler {
    public static ConcurrentHashMap<Integer, WebSocketSession> freelancerSessions = new ConcurrentHashMap<>();
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Integer freelancerId = extractFreelancerId(session);
        if (freelancerId != null) {
            freelancerSessions.put(freelancerId, session);
            System.out.println("Connected WebSocket for freelancerId: " + freelancerId);
        } else {
            System.out.println("Failed to extract freelancerId from session: " + session.getUri());
        }
    }

    // Fix in extractFreelancerId
    private Integer extractFreelancerId(WebSocketSession session) {
        String query = session.getUri().getQuery(); // e.g. userId=3
        if (query != null && query.contains("userId=")) {
            try {
                return Integer.parseInt(query.split("=")[1]);
            } catch (NumberFormatException e) {
                System.out.println("Invalid userId: " + query);
            }
        }
        return null;
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        freelancerSessions.values().remove(session); // remove session on disconnect
    }

    public static void sendToFreelancer(Integer freelancerId, NotificationDto message) {
        WebSocketSession session = freelancerSessions.get(freelancerId);
        if (session != null && session.isOpen()) {
            try {
                System.out.println("✅ Sending WebSocket message: " + message);
                String jsonMessage = objectMapper.writeValueAsString(message);
                session.sendMessage(new TextMessage(jsonMessage));
                System.out.println("Sent WebSocket notification to freelancerId: " + freelancerId);
            } catch (Exception e) {
                System.err.println("Failed to send WebSocket notification to freelancerId: " + freelancerId);
                e.printStackTrace();
            }
        } else {
            System.out.println("WebSocket session is not open for freelancerId: " + freelancerId);
        }
    }

}
