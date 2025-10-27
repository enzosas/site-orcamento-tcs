package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.ComponentePrecoDTO;
import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.dto.OrcamentoCompletoDTO;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.TalhaRepository;
import com.tcs.site_orcamento.service.PrecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/preco")
public class PrecoController {

    @Autowired
    PrecoService precoService;

    @Autowired
    TalhaRepository talhaRepository;

    @PostMapping("/totalSch")
    public Double precoTotalSch(@RequestBody ConfigDTO dto) {
        return precoService.calculaPrecoDeVenda(dto, PrecoService.TipoMotor.SCH).getPrecoTotal();
    }

    @PostMapping("/totalTcs")
    public Double precoTotalTcs(@RequestBody ConfigDTO dto) {
        return precoService.calculaPrecoDeVenda(dto, PrecoService.TipoMotor.TCS).getPrecoTotal();
    }

    @PostMapping("/talhaSemCircuito")
    public Double precoTalhaSemCircuito(@RequestBody ConfigDTO dto) {

        Talha talha = talhaRepository.findById(dto.getTalhaSelecionada())
                .orElseThrow(() -> new RuntimeException("Talha não encontrada com o ID: " + dto.getTalhaSelecionada()));
        return precoService.calculaPrecoDeVendaTalhaSemCircuito(talha, precoService.ipi).getPreco();
    }

    @PostMapping("/adaptadorViga")
    public Double precoAdaptadorViga(@RequestBody ConfigDTO dto) {

        ComponentePrecoDTO componente = precoService.calculaPrecoDeVendaAdaptadorViga(dto, precoService.ipi);
        if (componente == null) {
            return 0.0;
        }
        return componente.getPreco();
    }

    @PostMapping("/circuitoSch")
    public Double precoCircuitoSch(@RequestBody ConfigDTO dto) {
        return precoService.calculaPrecoDeVenda(dto, PrecoService.TipoMotor.SCH).getPrecoCircuito();
    }

    @PostMapping("/circuitoTcs")
    public Double precoCircuitoTcs(@RequestBody ConfigDTO dto) {
        return precoService.calculaPrecoDeVenda(dto, PrecoService.TipoMotor.TCS).getPrecoCircuito();
    }

    @PostMapping("/orcamentoCompleto")
    public ResponseEntity<OrcamentoCompletoDTO> getOrcamentoCompleto(@RequestBody ConfigDTO dto) {
        OrcamentoCompletoDTO orcamento = precoService.calculaOrcamentoCompleto(dto);
        return ResponseEntity.ok(orcamento);
    }
}
