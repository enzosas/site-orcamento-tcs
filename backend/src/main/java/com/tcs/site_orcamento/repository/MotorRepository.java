package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.Motor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MotorRepository extends JpaRepository<Motor, Long> {

    @Query("SELECT m FROM Motor m WHERE m.motor = :motor AND m.tensao = :tensao")
    Motor findByMotorAndTensao(
            @Param("motor") String motor,
            @Param("tensao") Integer tensao
    );

}
