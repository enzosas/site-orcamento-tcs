package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.entity.Usuario;
import com.tcs.site_orcamento.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    public Usuario authenticateAndGetUser(String username, String password) {

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Erro interno ao recuperar utilizador"));

        if (usuario.getAcessos() == null) {
            usuario.setAcessos(0);
        }
        usuario.setAcessos(usuario.getAcessos() + 1);
        
        return usuarioRepository.save(usuario);
    }

    public Usuario registerUser(Usuario user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        if (user.getIsAdmin() == null) {
            user.setIsAdmin(false);
        }
        user.setAcessos(0);
        return usuarioRepository.save(user);
    }
}