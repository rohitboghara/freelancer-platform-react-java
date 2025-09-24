package com.ntra.progigs.Controller;

import com.ntra.progigs.DTOs.LoginDTO;
import com.ntra.progigs.DTOs.UserDtoAuth;
import com.ntra.progigs.Entity.AuthenticationResponse;
import com.ntra.progigs.Exception.UserAlreadyExistsException;
import com.ntra.progigs.Service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class  AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserDtoAuth request) throws UserAlreadyExistsException {
        return ResponseEntity.ok(authenticationService.register(request));

    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginDTO request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestParam String otp,@RequestParam String email) {

        try {
            authenticationService.verifyOTP(email, otp);
            return ResponseEntity.ok("OTP verified successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());}
    }
}
