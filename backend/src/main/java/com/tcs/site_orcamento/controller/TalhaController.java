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
        System.out.println(">>> GET /api/talhas/" + modelo);
        return talhaRepository.findById(modelo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filtro-correnteCabo")
    public List<Talha> filtrarPorCabo(@RequestParam String correnteCabo) {
        System.out.println(">>> GET /filtro-correnteCabo?correnteCabo=" + correnteCabo);
        return talhaRepository.findByCorrenteCabo(correnteCabo);
    }

    @GetMapping("/filtro-capacidade")
    public List<Talha> filtrarPorCapacidade(@RequestParam Integer capacidade) {
        System.out.println(">>> GET /filtro-capacidade?capacidade=" + capacidade);
        return talhaRepository.findByCapacidade(capacidade);
    }

    @GetMapping("/filtro-tipoTrole")
    public List<Talha> filtrarPorTipoTrole(@RequestParam String tipoTrole) {
        System.out.println(">>> GET /filtro-tipoTrole?tipoTrole=" + tipoTrole);
        return talhaRepository.findByTipoTrole(tipoTrole);
    }

    @GetMapping("/filtro-cursoUtil")
    public List<Talha> filtrarPorcursoUtilGancho(@RequestParam Integer cursoUtilGancho) {
        System.out.println(">>> GET /filtro-cursoUtil?cursoUtilGancho=" + cursoUtilGancho);
        return talhaRepository.findByCursoUtilGancho(cursoUtilGancho);
    }
}
