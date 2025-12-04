package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.ConfigDTO;
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
    public ResponseEntity<ConfigDTO> buscar(@RequestParam Integer id) {
        return orcamentoRepository.findById(id)
                .map(orcamento -> {
                    ConfigDTO dto = orcamentoService.orcToDto(orcamento);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/salvar")
    public ResponseEntity<Orcamento> salvar(@RequestBody ConfigDTO config) {
        Orcamento orcamentoSalvo = orcamentoService.salvarOrcamento(config);
        return ResponseEntity.ok(orcamentoSalvo);
    }
}
