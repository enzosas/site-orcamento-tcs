package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.service.MaxiprodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/max")
public class MaxiprodController {

    @Autowired
    private MaxiprodService maxiprodService;

    @GetMapping("/queryLegal/{codigo}")
    public Mono<String> queryLegal(@PathVariable String codigo) {
        return maxiprodService.queryLegal(codigo);
    }

    @GetMapping("/getPrecoDeVenda/{codigo}")
    public Double getPrecoDeVenda(@PathVariable String codigo) {
        return maxiprodService.getPrecoDeVenda(codigo);
    }

    @GetMapping("/getIpi/{codigo}")
    public Double getIpi(@PathVariable String codigo) {
        return maxiprodService.getIpi(codigo);
    }

    @GetMapping("/getPrecoDeVendaComIpi/{codigo}")
    public Double getPrecoDeVendaComIpi(@PathVariable String codigo) {
        return maxiprodService.getPrecoDeVenda(codigo) * (1 + maxiprodService.getPrecoDeVenda(codigo)/100);
    }
    
    @GetMapping("/getPrecoDeAquisicao/{codigo}")
    public Double getPrecoDeAquisicao(@PathVariable String codigo) {
        return maxiprodService.getPrecoDeAquisicao(codigo);
    }
}
