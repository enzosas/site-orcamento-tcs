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
    private String contatoraSch;

    @Column(name = "disjuntor_contatora_sch", length = 20, nullable = false)
    private String disjuntorContatoraSch;

    @Column(name = "disjuntor_inversor_sch", length = 20, nullable = false)
    private String disjuntorInversorSch;

    @Column(length = 30, nullable = false)
    private String inversorSch;

    @Column(length = 50)
    private String resistorTcs;

    @Column(length = 20, nullable = false)
    private String contatoraTcs;

    @Column(name = "disjuntor_contatora_tcs", length = 20, nullable = false)
    private String disjuntorContatoraTcs;

    @Column(name = "disjuntor_inversor_tcs", length = 20, nullable = false)
    private String disjuntorInversorTcs;

    @Column(length = 30, nullable = false)
    private String inversorTcs;

}
