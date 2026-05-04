package com.tcs.site_orcamento.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.site_orcamento.service.PonteService;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/teste")
    public Double teste() {
        return PonteService.calculaPesoTotalPonteComTalha(15000.0, 122.82, 1842.30, 315.00, 26.0);
    }
}