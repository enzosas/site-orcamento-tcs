package com.tcs.site_orcamento.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrcamentoPonteDTO {
    private String cabeceira;
    private String trilhoCR;
    private Double cargaMaximaRoda;
    private Double pesoViga;
    private Double pesoParCabeceira;
    private Double pesoEletrificacaoTransversal;
    private Double pesoEletrificacaoLongitudinal;
    private Double pesoCaminhoRolamento;
    private Double pesoColunasApoio;
    private Double pesoTotal;
    private Double precoVigaPrincipal;
    private Double precoCabeceiras;
    private Double precoMontagem;
    private Double precoEletrificacaoTransversal;
    private Double precoEletrificacaoLongitudinal;
    private Double precoCaminhoRolamento;
    private Double precoColunasApoio;
    private Double precoTotal;
    private List<String> logs;
}