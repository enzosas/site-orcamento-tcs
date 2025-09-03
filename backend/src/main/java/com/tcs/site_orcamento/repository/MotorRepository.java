package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.Motor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MotorRepository extends JpaRepository<Motor, String> {

    @Query("SELECT m FROM Motor m WHERE m.motor = :motor AND m.tensao = :tensao")
    List<Motor> findByMotorAndTensao(
            @Param("motor") String motor,
            @Param("tensao") Integer tensao
    );

}
