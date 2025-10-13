package com.tcs.site_orcamento.dto;


import lombok.Data;

@Data
public class ConfigDTO {

    private String talhaSelecionada;
    private boolean excluirPainel;
    private boolean painel6Mov;
    private boolean controleRemoto;
    private boolean duplaVelocidadeElevacao;
    private boolean duplaVelocidadeTranslacao;
    private boolean transmissorExtra;
    private String potenciaMotores;
    private String modeloControle;
    private String tensao;
    private boolean incluirSinalizadores;
    private boolean fimCursoEsquerdaDireita;
    private boolean guiaCaboAco;
    private boolean celulaCarga;
    private boolean adaptadorViga;
}
