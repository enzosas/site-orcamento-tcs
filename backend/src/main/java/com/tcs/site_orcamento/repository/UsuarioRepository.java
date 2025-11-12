package com.tcs.site_orcamento.repository;

import com.tcs.site_orcamento.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, String> {

    Usuario findByUsername(String username);
}
