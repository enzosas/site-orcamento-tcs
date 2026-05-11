package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.VigaW;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VigaWRepository extends JpaRepository<VigaW, Integer> {

    @Query("SELECT v FROM VigaW v WHERE v.codigoTcs = :codigo")
    VigaW findByCodigo(
            @Param("codigo") String codigo
    );
}