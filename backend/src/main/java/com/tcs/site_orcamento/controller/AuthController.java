package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.dto.LoginRequestDTO;
import com.tcs.site_orcamento.dto.LoginResponseDTO;
import com.tcs.site_orcamento.dto.OrcamentosCriadosDTO;
import com.tcs.site_orcamento.entity.Usuario;
import com.tcs.site_orcamento.repository.UsuarioRepository;
import com.tcs.site_orcamento.service.AuthService;
import com.tcs.site_orcamento.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            Usuario usuario = authService.authenticateAndGetUser(
                    loginRequestDTO.getUsername(),
                    loginRequestDTO.getPassword()
            );

            String token = jwtService.generateToken(usuario);

            LoginResponseDTO response = new LoginResponseDTO(
                    token,
                    usuario.getId(),
                    usuario.getUsername(),
                    usuario.getIsAdmin()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = authService.registerUser(usuario);
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!usuarioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/list")
    public List<Usuario> listUsers() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/orcamentos")
    public ResponseEntity<List<OrcamentosCriadosDTO>> orcamentos() {
        try {
            List<OrcamentosCriadosDTO> lista = usuarioRepository.listaOrcamentosCriadosDTOs();
            return ResponseEntity.ok(lista);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
}