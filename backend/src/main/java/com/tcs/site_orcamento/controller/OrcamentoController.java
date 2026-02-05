package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.dto.SalvarOrcamentoDTO;
import com.tcs.site_orcamento.entity.Orcamento;
import com.tcs.site_orcamento.repository.OrcamentoRepository;
import com.tcs.site_orcamento.service.OrcamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orcamentos")
public class OrcamentoController {

    @Autowired
    private OrcamentoRepository orcamentoRepository;

    @Autowired
    private OrcamentoService orcamentoService;

    @GetMapping("/buscar")
    public ResponseEntity<SalvarOrcamentoDTO> buscar(@RequestParam Integer id) {
        return orcamentoRepository.findById(id)
                .map(orcamento -> {
                    SalvarOrcamentoDTO dto = orcamentoService.orcToDto(orcamento);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/salvar")
    public ResponseEntity<Orcamento> salvar(@RequestBody SalvarOrcamentoDTO request) {
        Orcamento orcamentoSalvo = orcamentoService.salvarOrcamento(
            request.getConfig(),
            request.getCliente(),
            request.getUsername()
        );
        return ResponseEntity.ok(orcamentoSalvo);
    }
}
