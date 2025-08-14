package com.tcs.site_orcamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tcs.site_orcamento.entity.Talha;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TalhaRepository extends JpaRepository<Talha, String> {
    List<Talha> findByCorrenteCabo(String correnteCabo);

    List<Talha> findByCapacidade(Integer capacidade);

    List<Talha> findByTipoTrole(String tipoTrole);

    List<Talha> findByCursoUtilGancho(Integer cursoUtilGancho);

    @Query("SELECT DISTINCT t.correnteCabo FROM Talha t")
    List<String> findDistinctCorrenteCabo();

}