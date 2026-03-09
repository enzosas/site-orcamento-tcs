package com.tcs.site_orcamento.dto;

import lombok.Data;

@Data
public class PonteConfigDTO {
    
    private Boolean dadosBasicos_isPonte;
    private String dadosBasicos_formaConstrutiva;
    private String dadosBasicos_capacidade;
    private Integer dadosBasicos_vaoLivre;
    private Boolean dadosBasicos_isCaminhoRolamento;
    private Boolean dadosBasicos_isColunasSustentacao;
    private Boolean dadosBasicos_isAntiColisao;
    private Integer dadosBasicos_comprimento;
    private String dadosBasicos_eletrificacaoTransversal;
    private String dadosBasicos_eletrificacaoLongitudinal;
    private String caminhoRolamento_tipo;
    private String caminhoRolamento_bitolaTrilho;
    private Integer caminhoRolamento_ladoA_distanciaApoios;
    private String caminhoRolamento_ladoA_perfilMetalico;
    private Integer caminhoRolamento_ladoB_distanciaApoios;
    private String caminhoRolamento_ladoB_perfilMetalico;
    private Boolean colunasSustentacao_distribuicaoIs2Lados;
    private Integer colunasSustentacao_ladoA_altura;
    private String colunasSustentacao_ladoA_dimensoes;
    private Integer colunasSustentacao_ladoA_numeroColunas;
    private Integer colunasSustentacao_ladoB_altura;
    private String colunasSustentacao_ladoB_dimensoes;
    private Integer colunasSustentacao_ladoB_numeroColunas;
}
