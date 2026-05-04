package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.entity.Cabeceira;
import com.tcs.site_orcamento.entity.MatrizCabeceira;
import com.tcs.site_orcamento.repository.CabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizCabeceiraRepository;
import com.tcs.site_orcamento.repository.CabeceiraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/ponte")
public class PonteController {

    @Autowired
    private MatrizCabeceiraRepository matrizCabeceiraRepository;

    @Autowired
    private CabeceiraRepository cabeceiraRepository;

    @GetMapping("/cabeceiraMatriz")
    public ResponseEntity<MatrizCabeceira> getCabeceiraMatriz(@RequestParam Integer capacidadeKg, Integer vaoMaximoMm) {
        return ResponseEntity.ok(matrizCabeceiraRepository.findByCapacidadeAndVao(capacidadeKg, vaoMaximoMm));
    }

    @GetMapping("/cabeceiraMatrizString")
    public ResponseEntity<String> getCabeceiraMatrizString(@RequestParam Integer capacidadeKg, Integer vaoMaximoMm) {
        MatrizCabeceira cabeceira = matrizCabeceiraRepository.findByCapacidadeAndVao(capacidadeKg, vaoMaximoMm);
        String modelo = cabeceira.getModelo();
        return ResponseEntity.ok(modelo);
    }

    @GetMapping("/cabeceira")
    public ResponseEntity<Cabeceira> getCabeceiraMatrizString(@RequestParam String codigo) {
        Cabeceira cabeceira = cabeceiraRepository.findByCodigo(codigo);
        return ResponseEntity.ok(cabeceira);
    }
    
}
