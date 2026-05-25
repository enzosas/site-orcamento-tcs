package com.tcs.site_orcamento.controller;

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
    public OrcamentoPonteDTO teste() {

        PonteConfigDTO config = new PonteConfigDTO(
            true,
            "Univiga - Tipo Caixão",
            3000,
            15000,
            true,
            true,
            true,
            16,
            "Cabo Chato",
            "Barramento Blindado - 3 consumidores",
            "Viga Metálica + Trilho",
            "QD.38 mm",
            10,
            "W460X82,0",
            8,
            "W360X57,8",
            true,
            5,
            "150 x 150 x 4,75",
            2,
            10,
            "200 x 200 x 6,35",
            2
        );
        return ponteService.geraOrcamentoPonte(config, 26.0);
    }
}