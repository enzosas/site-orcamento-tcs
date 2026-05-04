package com.tcs.site_orcamento.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="cabeceira", schema = "backend")
public class Cabeceira {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private Integer distanciaCentroRodas;

    @Column(nullable = false)
    private String potenciaMotor;

    @Column(nullable = false)
    private Integer pesoCabeceiraIndividual;

    @Column(nullable = false)
    private String velocidadeTranslacao;
}
