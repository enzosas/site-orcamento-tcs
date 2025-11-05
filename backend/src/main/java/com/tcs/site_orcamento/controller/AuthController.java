package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.dto.LoginRequestDTO;
import com.tcs.site_orcamento.dto.LoginResponseDTO;
import com.tcs.site_orcamento.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO){

        try{

            String token = authService.authenticateAndGetToken(
                    loginRequestDTO.getUsername(),
                    loginRequestDTO.getPassword()
            );
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO(token);
            return ResponseEntity.ok(loginResponseDTO);

        } catch (Exception e){

            return ResponseEntity.status(401).build();

        }
    }
}
