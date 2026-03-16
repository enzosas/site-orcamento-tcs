package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.entity.MatrizCabeceira;
import com.tcs.site_orcamento.repository.PonteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/ponte")
public class PonteController {

    @Autowired
    private PonteRepository ponteRepository;

    @GetMapping("/cabeceira")
    public ResponseEntity<MatrizCabeceira> getCabeceira(@RequestParam Integer capacidadeKg, Integer vaoMaximoMm) {
        return ResponseEntity.ok(ponteRepository.findByCapacidadeAndVao(capacidadeKg, vaoMaximoMm));
    }

    @GetMapping("/cabeceiraString")
    public ResponseEntity<String> getCabeceiraString(@RequestParam Integer capacidadeKg, Integer vaoMaximoMm) {
        MatrizCabeceira cabeceira = ponteRepository.findByCapacidadeAndVao(capacidadeKg, vaoMaximoMm);
        String modelo = cabeceira.getModelo();
        return ResponseEntity.ok(modelo);
    }
    
}
