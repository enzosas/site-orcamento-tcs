package com.tcs.site_orcamento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.site_orcamento.entity.Cabeceira;
import com.tcs.site_orcamento.entity.MatrizCabeceira;
import com.tcs.site_orcamento.entity.MatrizVigaSimples;
import com.tcs.site_orcamento.repository.CabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizCabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizVigaSimplesRepository;
import com.tcs.site_orcamento.service.PonteService;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @Autowired
    PonteService ponteService;

    @Autowired
    MatrizCabeceiraRepository mRepository;

    @Autowired
    CabeceiraRepository cRepository;

    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/teste")
    public Cabeceira teste() {
        
        MatrizCabeceira coisa = mRepository.findByCapacidadeAndVao(3000, 15000);
        Cabeceira cabeceira = cRepository.findByCodigo(coisa.getModelo());
        // Double preco = ponteService.calculaValorParCabeceiras(cabeceira);
        return cabeceira;
    }
}