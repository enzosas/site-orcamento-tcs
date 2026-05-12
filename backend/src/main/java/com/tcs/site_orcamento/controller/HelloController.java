package com.tcs.site_orcamento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.site_orcamento.entity.Cabeceira;
import com.tcs.site_orcamento.entity.MatrizCabeceira;
import com.tcs.site_orcamento.entity.MatrizVigaSimples;
import com.tcs.site_orcamento.entity.VigaW;
import com.tcs.site_orcamento.repository.CabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizCabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizVigaSimplesRepository;
import com.tcs.site_orcamento.repository.VigaWRepository;
import com.tcs.site_orcamento.service.MaxiprodService;
import com.tcs.site_orcamento.service.PonteService;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @Autowired
    PonteService ponteService;

    @Autowired
    MatrizCabeceiraRepository mRepository;

    @Autowired
    CabeceiraRepository cRepository;

    @Autowired
    VigaWRepository vRepository;

    @Autowired
    MaxiprodService maxiprod;

    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping("/teste")
    public String teste() {
        
        // MatrizCabeceira coisa = mRepository.findByCapacidadeAndVao(3000, 15000);
        // Cabeceira cabeceira = cRepository.findByCodigo(coisa.getModelo());
        // Double preco = ponteService.calculaValorParCabeceiras(cabeceira);
        // return cabeceira;
        // return vRepository.findByCodigo("W200X15,0");
        // return PonteService.calculaPesoCaminhoRolamento(15.0, 15.0, 13.0, 13.0, 11.51, 11.51);
        // return maxiprod.getPrecoDeVenda("CAB.CHA.06X15").toString();
        // return PonteService.calculaValorEletrificacaoLongitudinal(15.0, 232.7, 932.0, "Barramento Blindado - 3 consumidores").toString();
        // return PonteService.calculaPesoColunas("Ponte Rolante", 10.0, "200 x 200 x 6,35").toString();
        // return PonteService.calculaValorKgColunas().toString();
        // return PonteService.calculaPesoColunasTotal(2.0, 2.0, 159.94, 494.24).toString();
        // return ponteService.calculaAntiColisao(15000.0).toString();
        return PonteService.consultaMontagem(35000.0, 25000.0).toString();
    }
}