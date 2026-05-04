package com.tcs.site_orcamento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.site_orcamento.entity.MatrizVigaSimples;
import com.tcs.site_orcamento.repository.MatrizVigaSimplesRepository;
import com.tcs.site_orcamento.service.PonteService;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @Autowired
    MatrizVigaSimplesRepository mRepository;

    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/teste")
    public MatrizVigaSimples teste() {
        
        MatrizVigaSimples aa = mRepository.findByCapacidadeAndVao(3000, 8999);
        return aa;
    }
}