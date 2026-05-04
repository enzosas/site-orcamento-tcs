package com.tcs.site_orcamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tcs.site_orcamento.entity.MatrizVigaSimples;

public interface MatrizVigaSimplesRepository extends JpaRepository<MatrizVigaSimples, Integer> {

    @Query(value = "SELECT * FROM backend.matriz_viga_simples WHERE capacidade_kg >= :capacidadeKg AND vao_maximo_mm >= :vaoMaximoMm ORDER BY capacidade_kg ASC, vao_maximo_mm ASC LIMIT 1", nativeQuery = true)
    MatrizVigaSimples findByCapacidadeAndVao(
            @Param("capacidadeKg") Integer capacidadeKg,
            @Param("vaoMaximoMm") Integer vaoMaximoMm
    );

}