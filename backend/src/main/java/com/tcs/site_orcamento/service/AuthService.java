package com.tcs.site_orcamento.service;

import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    public String authenticateAndGetToken(String username, String password){

        if(Objects.equals(username, "admin") && Objects.equals(password, "123")){

            return  "tokenTokenToken";

        } else {

            throw new RuntimeException("Usuario ou senha incorretos");

        }

    }
}
