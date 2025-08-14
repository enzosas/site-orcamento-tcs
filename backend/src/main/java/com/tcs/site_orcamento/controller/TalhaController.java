package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/talhas")
public class TalhaController {

    @Autowired
    private TalhaRepository talhaRepository;

    @GetMapping("/")
    public List<Talha> getTalhasAll() {
        return talhaRepository.findAll();
    }

    @GetMapping("/{modelo}")
    public ResponseEntity<Talha> getTalhaPorModelo(@PathVariable String modelo) {
        return talhaRepository.findById(modelo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filtro-correnteCabo")
    public List<Talha> filtrarPorCabo(@RequestParam String correnteCabo) {
        return talhaRepository.findByCorrenteCabo(correnteCabo);
    }

    @GetMapping("/filtro-capacidade")
    public List<Talha> filtrarPorCapacidade(@RequestParam Integer capacidade) {
        return talhaRepository.findByCapacidade(capacidade);
    }

    @GetMapping("/filtro-tipoTrole")
    public List<Talha> filtrarPorTipoTrole(@RequestParam String tipoTrole) {
        return talhaRepository.findByTipoTrole(tipoTrole);
    }

    @GetMapping("/filtro-cursoUtil")
    public List<Talha> filtrarPorcursoUtilGancho(@RequestParam Integer cursoUtilGancho) {
        return talhaRepository.findByCursoUtilGancho(cursoUtilGancho);
    }

    @GetMapping("/distinct-correnteCabo")
    public List<String>  distinctCorrenteCabo() {
        return talhaRepository.findDistinctCorrenteCabo();
    }
}
