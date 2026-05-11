package com.tcs.site_orcamento.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="viga_w", schema = "backend")
public class VigaW {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String codigoTcs;

    @Column
    private String codigoGerdau;

    @Column(nullable = false)
    private Double massaLinear;
    
    @Column(nullable = false)
    private Double d1;
    
    @Column(nullable = false)
    private Double bf;
    
    @Column(nullable = false)
    private Double tw;
    
    @Column(nullable = false)
    private Double tf;
    
    @Column(nullable = false)
    private Double h;
    
    @Column(nullable = false)
    private Double d2;
    
    @Column(nullable = false)
    private Double area;
    
    @Column(nullable = false)
    private Double ix;
    
    @Column(nullable = false)
    private Double wx;
    
    @Column(nullable = false)
    private Double rx;
    
    @Column(nullable = false)
    private Double zx;
    
    @Column(nullable = false)
    private Double iy;
    
    @Column(nullable = false)
    private Double wy;
    
    @Column(nullable = false)
    private Double ry;
    
    @Column(nullable = false)
    private Double zy;
    
    @Column(nullable = false)
    private Double rt;
    
    @Column(nullable = false)
    private Double it;
    
    @Column(nullable = false)
    private Double yf;
    
    @Column(nullable = false)
    private Double yw;
    
    @Column(nullable = false)
    private Double cw;
    
    @Column(nullable = false)
    private Double u;
    
}
