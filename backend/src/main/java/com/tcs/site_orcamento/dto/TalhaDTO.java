package com.tcs.site_orcamento.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class TalhaDTO {

    private String codigo;
    private Integer capacidade;
    private String formaConstrutiva;
    private String grupoTrabalho;
    private String correnteCabo;
    private String bitola; // Adicionado (BIT)
    private Integer cursoUtilGancho;
    private String tipoTrole;
    private String tensaoTrifasica;
    private String motorElevacao;
    private String velElevacaoPadrao;
    private String velElevacaoOpcional;
    private String acionamentoMotorElevacao;
    private String motorTranslacao;
    private String velTranslacaoPadrao;
    private String velTranslacaoOpcional;
    private String larguraVigaPadrao;
    private String acionamentoMotorTranslacao;
    private Boolean freioNoCarroTranslacao;
    private String potenciaMotorPonte; // Adicionado (PMP)
    private Boolean celulaCargaSerie;
    private String guiaCabo;
    private String fimCursoSobe;
    private String fimCursoDesce; // Adicionado (FCD)
    private String fimCursoEmergencia; // Adicionado (FCE)
    private String botoeira;
    private String controleRemoto; // Adicionado (CRM)
    private Integer caboBotoeira;
    private Integer ramais;
    private String painelComandoPadrao;
    private String tensaoComando;
    private Integer peso;
    private Boolean duplaVelocidadeElevacaoInversor;
    private Boolean duplaVelocidadeTranslacaoInversor;
    private Boolean painelParaPonteRolante;
    private Boolean celulaCargaDisponivel;
    private Boolean controleRemotoDisponivel;
    private Boolean fimCursoDireitaEsquerdaDisponivel;
    private Boolean guiaCaboDisponivel;
    private Boolean adaptadorVigaDisponivel;
    private String codigoPainelTalhaSemOpcional;
    private String resistorFrenagem;
    private String codigoPainel6Mov;
    private Boolean exclusaoPainelComandoForca;
}