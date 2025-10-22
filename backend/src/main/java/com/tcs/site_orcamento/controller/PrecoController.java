package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.service.PrecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/preco")
public class PrecoController {

    @Autowired
    PrecoService precoService;

    @PostMapping("/totalSch")
    public Double precoTotalSch(@RequestBody ConfigDTO dto) {
        return precoService.calculaPrecoDeVenda(dto, PrecoService.TipoMotor.SCH).getPrecoTotal();
    }

    @PostMapping("/totalTcs")
    public Double precoTotalTcs(@RequestBody ConfigDTO dto) {
        return precoService.calculaPrecoDeVenda(dto, PrecoService.TipoMotor.TCS).getPrecoTotal();
    }
}
