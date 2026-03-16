package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.MatrizCabeceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PonteRepository extends JpaRepository<MatrizCabeceira, Integer> {

    @Query(value = "SELECT * FROM backend.matriz_cabeceira WHERE capacidade_kg >= :capacidadeKg AND vao_maximo_mm >= :vaoMaximoMm ORDER BY capacidade_kg ASC, vao_maximo_mm ASC LIMIT 1", nativeQuery = true)
    MatrizCabeceira findByCapacidadeAndVao(
            @Param("capacidadeKg") Integer capacidadeKg,
            @Param("vaoMaximoMm") Integer vaoMaximoMm
    );

}