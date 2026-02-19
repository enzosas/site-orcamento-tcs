package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.Usuario;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tcs.site_orcamento.dto.OrcamentosCriadosDTO;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByUsername(String username);

    @Query("SELECT new com.tcs.site_orcamento.dto.OrcamentosCriadosDTO(o.username, COUNT(o)) " +
        "FROM Orcamento o " +
        "GROUP BY o.username")
    List<OrcamentosCriadosDTO> listaOrcamentosCriadosDTOs();
}


