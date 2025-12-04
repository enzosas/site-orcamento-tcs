package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.Orcamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrcamentoRepository extends JpaRepository<Orcamento, Integer> {
}
