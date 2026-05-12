package com.tcs.site_orcamento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcs.site_orcamento.dto.OrcamentoPonteDTO;
import com.tcs.site_orcamento.dto.PonteConfigDTO;
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
    public OrcamentoPonteDTO teste() {

        PonteConfigDTO config = new PonteConfigDTO(
            true,
            "Univiga - Tipo Caixão",
            3000,
            15000,
            true,
            true,
            true,
            16,
            "Cabo Chato",
            "Barramento Blindado - 3 consumidores",
            "Viga Metálica + Trilho",
            "QD.38 mm",
            10,
            "W460X82,0",
            8,
            "W360X57,8",
            true,
            5,
            "150 x 150 x 4,75",
            2,
            10,
            "200 x 200 x 6,35",
            2
        );
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
        // return ponteService.getCabeceira(3000, 15000);
        return ponteService.geraOrcamentoPonte(config);
    }
}