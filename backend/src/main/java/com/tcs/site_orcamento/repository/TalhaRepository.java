package com.tcs.site_orcamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tcs.site_orcamento.entity.Talha;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TalhaRepository extends JpaRepository<Talha, String> {
    List<Talha> findByCorrenteCabo(String correnteCabo);

    List<Talha> findByCapacidade(Integer capacidade);

    List<Talha> findByTipoTrole(String tipoTrole);

    List<Talha> findByCursoUtilGancho(Integer cursoUtilGancho);

    @Query("SELECT DISTINCT t.correnteCabo FROM Talha t")
    List<String> findDistinctCorrenteCabo();

    @Query("SELECT DISTINCT t.capacidade FROM Talha t ORDER BY t.capacidade")
    List<String> findDistinctCapacidade();

    @Query("SELECT DISTINCT t.tipoTrole FROM Talha t")
    List<String> findDistinctTipoTrole();

    @Query("SELECT DISTINCT t.cursoUtilGancho FROM Talha t")
    List<String> findDistinctCursoUtilGancho();

    @Query("SELECT t FROM Talha t " +
            "WHERE (:correnteCabo IS NULL OR t.correnteCabo = :correnteCabo) " +
            "AND (:capacidade IS NULL OR t.capacidade = :capacidade) " +
            "AND (:tipoTrole IS NULL OR t.tipoTrole = :tipoTrole) " +
            "AND (:cursoUtilGancho IS NULL OR t.cursoUtilGancho = :cursoUtilGancho)")
    List<Talha> findByAll(
            @Param("correnteCabo") String correnteCabo,
            @Param("capacidade") Integer capacidade,
            @Param("tipoTrole") String tipoTrole,
            @Param("cursoUtilGancho") String cursoUtilGancho
    );

    @Query("SELECT DISTINCT t.acionamentoMotorElevacao FROM Talha t")
    List<String> findDistinctAcionamentoMotorElevacao();

    @Query("SELECT DISTINCT t.acionamentoMotorTranslacao FROM Talha t")
    List<String> findDistinctAcionamentoMotorTranslacao();

}