package com.tcs.site_orcamento.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "motores")
public class Motor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String motor;

    @Column(nullable = false)
    private Integer tensao;

    @Column(length = 20, nullable = false)
    private String contatora;

    @Column(name = "disjuntor_contatora", length = 20, nullable = false)
    private String disjuntorContatora;

    @Column(name = "disjuntor_inversor", length = 20, nullable = false)
    private String disjuntorInversor;

    @Column(length = 30, nullable = false)
    private String inversor;

    @Column(length = 50)
    private String resistor;
}
