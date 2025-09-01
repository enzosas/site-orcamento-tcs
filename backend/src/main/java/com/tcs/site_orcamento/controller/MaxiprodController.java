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
}
