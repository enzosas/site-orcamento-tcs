package com.tcs.site_orcamento.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.site_orcamento.dto.OrcamentoPonteDTO;
import com.tcs.site_orcamento.dto.PonteConfigDTO;
import com.tcs.site_orcamento.repository.CabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizCabeceiraRepository;
import com.tcs.site_orcamento.repository.VigaWRepository;
import com.tcs.site_orcamento.service.MaxiprodService;
import com.tcs.site_orcamento.service.PonteService;
import com.tcs.site_orcamento.dto.TalhaDTO;;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @Autowired
    PonteService ponteService;

    @Autowired
    MatrizCabeceiraRepository mRepository;

    @Autowired
    CabeceiraRepository cRepository;

    @Autowired
    VigaWRepository vRepository;

    @Autowired
    MaxiprodService maxiprod;

    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/preco")
    public Double testePreco() {
        return maxiprod.getPrecoDeVenda("QD.38");
    }
    
    @GetMapping("/teste")
    public String teste() {
        return maxiprod.getMiscOptions();
    }
}