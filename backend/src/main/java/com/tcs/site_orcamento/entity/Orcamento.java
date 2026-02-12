package com.tcs.site_orcamento.entity;

import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="orcamentos", schema = "backend")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String talhaSelecionada;

    @Column(nullable = false)
    private Boolean excluirPainel;

    @Column(nullable = false)
    private Boolean painel6Mov;

    @Column(nullable = false)
    private Boolean controleRemoto;

    @Column(nullable = false)
    private Boolean duplaVelocidadeElevacao;

    @Column(nullable = false)
    private Boolean duplaVelocidadeTranslacao;

    @Column(nullable = false)
    private Boolean transmissorExtra;

    @Column(nullable = false)
    private String potenciaMotores;

    @Column(nullable = false)
    private String modeloControle;

    @Column(nullable = false)
    private String tensao;

    @Column(nullable = false)
    private Boolean incluirSinalizadores;

    @Column(nullable = false)
    private Boolean fimCursoEsquerdaDireita;

    @Column(nullable = false)
    private Boolean guiaCaboAco;

    @Column(nullable = false)
    private Boolean celulaCarga;

    @Column(nullable = false)
    private Boolean adaptadorViga;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "cliente", columnDefinition = "jsonb")
    private Map<String, Object> cliente;

    @Column
    private String username;

}
