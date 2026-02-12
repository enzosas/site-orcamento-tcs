package com.tcs.site_orcamento.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name= "talhas", schema = "backend")
public class Talha {

    @Id
    @Column(length = 20, nullable = false)
    private String modelo;

    private Integer capacidade; 

    @Column(length = 255)
    private String formaConstrutiva;

    @Column(length = 255)
    private String grupoTrabalho;

    @Column(length = 255)
    private String correnteCabo;

    private Integer cursoUtilGancho;

    @Column(length = 255)
    private String tipoTrole;

    @Column(length = 50)
    private String tensaoTrifasica;

    @Column(length = 255)
    private String motorElevacao;

    @Column(length = 255)
    private String velElevacaoPadrao;

    @Column(length = 255)
    private String velElevacaoOpcional;

    @Column(length = 255)
    private String acionamentoMotorElevacao;

    @Column(length = 255)
    private String motorTranslacao;

    @Column(length = 255)
    private String velTranslacaoPadrao;

    @Column(length = 255)
    private String velTranslacaoOpcional;

    @Column(length = 255)
    private String larguraVigaPadrao;

    @Column(length = 255)
    private String acionamentoMotorTranslacao;

    private Boolean freioNoCarroTranslacao;

    private Boolean celulaCargaSerie;

    @Column(length = 255)
    private String guiaCabo;

    @Column(length = 255)
    private String fimCursoSobe;

    @Column(length = 255)
    private String botoeira;

    private Integer caboBotoeira;

    private Integer ramais;

    @Column(length = 255)
    private String painelComandoPadrao;

    @Column(length = 50)
    private String tensaoComando;

    @Column(columnDefinition = "text")
    private String localArquivoImagem;

    private BigDecimal peso;

    private Boolean duplaVelocidadeElevacaoInversor;

    private Boolean duplaVelocidadeTranslacaoInversor;

    private Boolean painelParaPonteRolante;

    private Boolean celulaCargaDisponivel;

    private Boolean controleRemotoDisponivel;

    private Boolean fimCursoDireitaEsquerdaDisponivel;

    private Boolean guiaCaboDisponivel;

    private Boolean adaptadorVigaDisponivel;

    @Column(length = 255)
    private String codigoPainelTalhaSemOpcional;

    @Column(length = 255)
    private String resistorFrenagem;

    @Column(length = 255, name = "codigo_painel_6_mov")
    private String codigoPainel6Mov;

    private Boolean exclusaoPainelComandoForca;
}
