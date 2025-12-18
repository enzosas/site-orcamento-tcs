package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.entity.Usuario;
import com.tcs.site_orcamento.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public String authenticateAndGetToken(String username, String password){

        Usuario usuario;

        try {
            usuario = usuarioRepository.findByUsername(username);
        } catch (Exception e) {
            throw new RuntimeException("Usuario ou senha incorretos");
        }

        if(Objects.equals(password, usuario.getPassword())){
            if (usuario.getAcessos() == null) {
                usuario.setAcessos(0);
            }
            usuario.setAcessos(usuario.getAcessos() + 1);
            usuarioRepository.save(usuario);
            return  "tokenTokenToken";
        } else {
            throw new RuntimeException("Usuario ou senha incorretos");
        }
    }
}
