package com.tcs.site_orcamento.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="matriz_viga_simples", schema = "backend")
public class MatrizVigaSimples {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer capacidadeKg;

    @Column(nullable = false)
    private Integer vaoMaximoMm;

    @Column(nullable = false)
    private Double pesoMetroLinear;
}