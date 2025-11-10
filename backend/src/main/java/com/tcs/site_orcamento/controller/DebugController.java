package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.service.DebugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    DebugService debugService;

    @GetMapping("/codigosFaltando")
    public Map<String, List<String>> getCodigosFaltando() {
        return debugService.getCodigosFaltando();
    }

    @GetMapping("/allPrecosTalhas")
    public Map<String, Double> getPrecoTalhaAll() {
        return debugService.getPrecoTalhaAll();
    }

    @GetMapping("/disjuntoresContatora")
    public Map<String, String> getDisjuntoresContatoraAll() {
        return debugService.getDisjuntoresContatoraAll();
    }

    @GetMapping("/disjuntoresInversor")
    public Map<String, String> getDisjuntoresInversorAll() {
        return debugService.getDisjuntoresInversorAll();
    }

}
