package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.Cabeceira;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CabeceiraRepository extends JpaRepository<Cabeceira, Integer> {

    @Query("SELECT c FROM Cabeceira c WHERE c.modelo = :codigo")
    Cabeceira findByCodigo(
            @Param("codigo") String codigo
    );
}