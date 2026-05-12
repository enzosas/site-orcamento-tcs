package com.tcs.site_orcamento.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrcamentoPonteDTO {
    private String cabeceira;
    private String trilhoCR;
    private Boolean cargaMaximaRoda;
    private Boolean pesoViga;
    private Boolean pesoParCabeceira;
    private Boolean pesoEletrificacaoTransversal;
    private Boolean pesoEletrificacaoLongitudinal;
    private Boolean pesoCaminhoRolamento;
    private Boolean pesoColunasApoio;
    private Boolean pesoTotal;
    private Boolean precoVigaPrincipal;
    private Boolean precoCabeceiras;
    private Boolean precoMontagem;
    private Boolean precoEletrificacaoTransversal;
    private Boolean precoEletrificacaoLongitudinal;
    private Boolean precoCaminhoRolamento;
    private Boolean precoColunasApoio;
    private Boolean precoTotal;
}